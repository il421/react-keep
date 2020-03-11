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
  ...rest
}) => {
  return (
    <div className={className}>
      {isTextArea ? (
        <TextareaAutosize
          {...input}
          {...rest}
          spellCheck="false"
          autoComplete="new-password"
          autoFocus={autoFocus}
        />
      ) : (
        <input
          {...input}
          {...rest}
          autoComplete="new-password"
          autoFocus={autoFocus}
        />
      )}
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

export const TextInputField: React.FunctionComponent<ExposedFieldProps<
  string,
  HTMLElement
> & {
  type?: string;
  placeholder?: string;
  className: string;
  isTextArea?: boolean;
  autoFocus?: boolean;
}> = props => (
  <Field
    {...props}
    name={props.name}
    component={FieldAdapter}
    parse={(value: string) => value ?? ""}
  />
);
