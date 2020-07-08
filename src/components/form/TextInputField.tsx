import React from "react";
import { Field } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";

const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  autoFocus = false,
  input,
  meta,
  isTextArea = false,
  onKeyUp,
  ...rest
}) => {
  const handleOnKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onKeyUp && onKeyUp(event.keyCode);
  };
  return (
    <div className={className}>
      {isTextArea ? (
        <TextareaAutosize
          {...input}
          {...rest}
          onKeyUp={handleOnKeyUp}
          spellCheck="false"
          autoComplete="new-password"
          autoFocus={autoFocus}
        />
      ) : (
        <input
          {...input}
          {...rest}
          onKeyUp={handleOnKeyUp}
          autoComplete="new-password"
          autoFocus={autoFocus}
        />
      )}
      {(meta.error || meta.submitError) && meta.touched && (
        <span id={`error-message-${input.name}`}>{meta.error}</span>
      )}
    </div>
  );
};

export interface TextInputFieldProps
  extends ExposedFieldProps<string, HTMLElement> {
  type?: string;
  placeholder?: string;
  className: string;
  isTextArea?: boolean;
  onKeyUp?: (keyCode: number) => void;
  autoFocus?: boolean;
}
export const TextInputField: React.FunctionComponent<TextInputFieldProps> = (
  props
) => (
  <Field
    {...props}
    name={props.name}
    component={FieldAdapter}
    parse={(value: string) => value ?? ""}
  />
);
