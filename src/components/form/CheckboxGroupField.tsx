import React from "react";
import { Field } from "react-final-form";

import { CheckboxGroup, CheckboxGroupProps } from "../ui-components";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";

const FieldAdapter: React.FunctionComponent<
  FieldAdapterProps<CheckboxGroupProps["selectedKeys"]> &
    Pick<CheckboxGroupProps, "options" | "classNames">
> = ({ input, options, classNames }) => {
  return (
    <CheckboxGroup
      options={options}
      classNames={classNames}
      selectedKeys={input.value}
      onChange={(selectedKeys: string[]) => input.onChange(selectedKeys)}
    />
  );
};
export type CheckboxGroupFieldProps = ExposedFieldProps<
  CheckboxGroupProps["selectedKeys"],
  HTMLElement
> &
  Pick<CheckboxGroupProps, "options" | "classNames">;
export const CheckboxGroupField: React.FunctionComponent<CheckboxGroupFieldProps> = props => (
  <Field {...props} name={props.name} component={FieldAdapter} />
);
