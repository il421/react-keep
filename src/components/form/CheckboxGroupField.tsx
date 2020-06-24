import React from "react";
import { Field } from "react-final-form";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";
import { CheckboxGroup, CheckboxGroupProps } from "../ui-components";

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
export const CheckboxGroupField: React.FunctionComponent<CheckboxGroupFieldProps> = (
  props
) => <Field {...props} name={props.name} component={FieldAdapter} />;
