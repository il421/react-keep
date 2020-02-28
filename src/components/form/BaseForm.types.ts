import { FieldProps, FieldRenderProps } from "react-final-form";

export interface ExposedFieldProps<FieldValue, T extends HTMLElement>
  extends Pick<
    FieldProps<FieldValue, FieldRenderProps<FieldValue, T>, T>,
    | "name"
    | "subscription"
    | "validate"
    | "value"
    | "defaultValue"
    > {}

export type FieldAdapterProps = FieldRenderProps<string, HTMLElement>;

// value is an icon name from @fontawesome/react-fontawesome"
// "times" is default or none value
export enum BaseFormOptions {
  times = "times",
  palette = "palette",
  tags = "tags",
}
