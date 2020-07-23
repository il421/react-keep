import { FieldProps, FieldRenderProps } from "react-final-form";

export interface ExposedFieldProps<FieldValue, T extends HTMLElement>
  extends Pick<
    FieldProps<FieldValue, FieldRenderProps<FieldValue, T>, T>,
    "name" | "subscription" | "validate" | "value" | "defaultValue"
  > {}

export type FieldAdapterProps<T = string> = FieldRenderProps<T, HTMLElement>;

// value is an icon name from @fontawesome/react-fontawesome"
// "none" is default or none value
export enum BaseFormOptions {
  none = "none",
  palette = "palette",
  tags = "tags",
  collaborators = "share",
}
