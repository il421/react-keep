import React, { ReactNode } from "react";
import { Form, FormRenderProps } from "react-final-form";
import { FormApi, ValidationErrors } from "final-form";
import { sortArray } from "../../common";
import arrayMutators from "final-form-arrays";

/**
 * Base Form initially works with all types of notes, however also
 * can be used as a any usage form
 * @param initialValues - FormValues plus currentOption to switch between a note options
 * @param onSubmit - handle submit action, have the form values as an argument
 * @param validate - options, handle validation, return ValidationErrors
 * @param getFormActions - form actions, buttons
 * @param formClassName - optional, a number of the form components class names for styling and testing
 * @param resetAfterSubmitting - options reset after submitting
 */

export interface BaseFormProps<FormValues> {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  getFormActions: (
    isDisable: boolean,
    isSubmitting: boolean,
    values: FormValues
  ) => ReactNode;
  formClassName: string;
  validate?: (values: FormValues) => ValidationErrors;
  resetAfterSubmitting?: boolean;
}

export class BaseForm<FormValues> extends React.PureComponent<
  BaseFormProps<FormValues>
> {
  private form: FormApi<FormValues> | undefined;

  componentWillUnmount() {
    this.form && this.form.pauseValidation();
  }

  render() {
    const {
      initialValues,
      formClassName,
      onSubmit,
      validate,
      getFormActions,
      resetAfterSubmitting = false,
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

          if (!this.form) {
            this.form = form;
          }

          return (
            <>
              <form
                onSubmit={handleSubmit}
                className={formClassName}
                autoComplete="off"
              >
                {this.props.children}
                <div>{getFormActions(!dirty, submitting, values)}</div>
              </form>
            </>
          );
        }}
      </Form>
    );
  }
}
