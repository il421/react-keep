import React from "react";
import { Field } from "react-final-form";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";

const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  id,
  input,
  meta,
  ...rest
}) => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    target.files && input.onChange(target.files[0]);
  };
  return (
    <div className={className}>
      <input
        {...rest}
        name={input.name}
        id={id}
        type="file"
        onChange={handleChange}
        accept="image/*"
      />
      {(meta.error || meta.submitError) && meta.touched && (
        <span id={`error-message-${input.name}`}>{meta.error}</span>
      )}
    </div>
  );
};

export interface FileFormFieldProps
  extends ExposedFieldProps<string, HTMLElement> {
  className: string;
  id?: string;
}
export const FileFormField: React.FunctionComponent<FileFormFieldProps> = (
  props
) => <Field {...props} name={props.name} component={FieldAdapter} />;
