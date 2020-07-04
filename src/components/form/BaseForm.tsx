import React, { ReactNode } from "react";
import { Form, FormRenderProps } from "react-final-form";
import { ValidationErrors } from "final-form";
import { ConfirmButton, FlexBox, LinkButton } from "../ui-components";
import { AlignItems, JustifyContent, sortArray } from "../../common";
import { BaseFormOptions } from "./BaseForm.types";
import { RadioButtonsInputField } from "./RadioButtonsInputField";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../styles/components/notes/_note-form.scss";
import "../../styles/ui-components/_icon-button.scss";
import "../../styles/ui-components/_link-button.scss";
import arrayMutators from "final-form-arrays";

/**
 * Base Form initially works with all types of notes, however also
 * can be used as a any usage form
 * @param initialValues - FormValues plus currentOption to switch between a note options
 * @param onSubmit - handle submit action, have the form values as an argument
 * @param onCancel - optional, handle cancel action
 * @param validate - options, handle validation, return ValidationErrors
 * @param getButtons - optional, if specified replays, options and common buttons
 * @param getFormOptions - optional, if specified and getButtons = undefined, add extra fields as a note options
 * @param getSubmitButtonName - optional, overwrite the default submit button name
 * @param classNames - optional, a number of the form components class names for styling and testing
 * @param resetAfterSubmitting - options reset after submitting
 */

export interface BaseFormProps<FormValues> {
  initialValues: FormValues & { currentOption?: BaseFormOptions };
  onSubmit: (values: FormValues) => void;
  getButtons?: (
    isDisable: boolean,
    isSubmitting: boolean,
    values: FormValues
  ) => ReactNode;
  getFormOptions?: ReactNode;
  onCancel?: () => void;
  submitButtonName?: string;
  classNames?: BaseFormClassNames;
  validate?: (values: FormValues) => ValidationErrors;
  resetAfterSubmitting?: boolean;
}

interface BaseFormClassNames {
  form?: string;
  buttons?: string;
  actions?: string;
  options?: string;
}

export class BaseForm<FormValues> extends React.PureComponent<
  BaseFormProps<FormValues>
> {
  render() {
    const {
      initialValues,
      classNames,
      onSubmit,
      validate,
      onCancel,
      getButtons,
      getFormOptions,
      resetAfterSubmitting = false,
      submitButtonName = "Keep",
    } = this.props;
    return (
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        mutators={{ sortArray, ...arrayMutators }}
      >
        {(props: FormRenderProps<FormValues>) => {
          const {
            dirty,
            values,
            submitting,
            submitSucceeded,
            form,
            handleSubmit,
          } = props;
          // reset form if form is submitted successfully
          resetAfterSubmitting && submitSucceeded && form.reset();

          return (
            <>
              <form
                onSubmit={handleSubmit}
                className={classNames?.form ?? "note-form"}
                autoComplete="off"
              >
                {this.props.children}
                <div>
                  {
                    // if getButtons = true, use custom buttons if the form is not user
                    // for notes (like login form), otherwise render original buttons
                    getButtons ? (
                      getButtons(!dirty, submitting, values)
                    ) : (
                      <>
                        <FlexBox
                          justifyContent={JustifyContent.spaceBetween}
                          alignItems={AlignItems.center}
                          className={
                            classNames?.actions ?? "note-form__actions actions"
                          }
                        >
                          <FlexBox
                            justifyContent={JustifyContent.start}
                            alignItems={AlignItems.baseline}
                            className={
                              classNames?.options ?? "actions__options"
                            }
                          >
                            {Object.values(BaseFormOptions).map(
                              (option: string) =>
                                option === BaseFormOptions.none ? null : (
                                  <RadioButtonsInputField
                                    id={`icon-${option}`}
                                    key={option}
                                    name="currentOption"
                                    radioClassName="options__item"
                                    value={option}
                                    labelProps={{
                                      iconName: option as IconProp,
                                    }}
                                  />
                                )
                            )}
                          </FlexBox>

                          <FlexBox
                            justifyContent={JustifyContent.end}
                            alignItems={AlignItems.center}
                            className={
                              classNames?.buttons ?? "actions__buttons"
                            }
                          >
                            <LinkButton
                              id="test-base-form-close-button"
                              text="Close"
                              type="button"
                              disabled={submitting}
                              onClick={() => onCancel && onCancel()}
                            />

                            <ConfirmButton
                              id="test-base-form-submit-button"
                              className="link-button"
                              text={submitButtonName}
                              type="submit"
                              disabled={!dirty}
                              loading={submitting}
                            />
                          </FlexBox>
                        </FlexBox>

                        {getFormOptions && (
                          <FlexBox
                            justifyContent={JustifyContent.spaceBetween}
                            className="note-form__extra-fields"
                          >
                            {getFormOptions}
                          </FlexBox>
                        )}
                      </>
                    )
                  }
                </div>
              </form>
            </>
          );
        }}
      </Form>
    );
  }
}
