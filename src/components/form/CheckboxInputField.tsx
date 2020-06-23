import React from "react";
import { Field } from "react-final-form";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";

const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  id = "defaultId",
  input: { ...input },
}) => {
  return (
    <div className={className}>
      <input id={id} {...input} type="checkbox" />
      <label htmlFor={id} />
    </div>
  );
};

export const CheckboxInputField: React.FunctionComponent<
  ExposedFieldProps<string, HTMLElement> & { className: string; id?: string }
> = (props) => (
  <Field
    {...props}
    name={props.name}
    type="checkbox"
    component={FieldAdapter}
  />
);
