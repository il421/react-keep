import React from "react";
import { Field } from "react-final-form";

import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";

const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  id,
  input: { ...input }
}) => {
  return (
    <div className={className}>
      <input id={id} {...input} type="checkbox" />
      <label htmlFor={id} />
    </div>
  );
};

export interface CheckboxInputFieldProps
  extends ExposedFieldProps<string, HTMLElement> {
  className: string;
  id: string;
}
export const CheckboxInputField: React.FunctionComponent<CheckboxInputFieldProps> = props => (
  <Field
    {...props}
    name={props.name}
    type="checkbox"
    component={FieldAdapter}
  />
);
