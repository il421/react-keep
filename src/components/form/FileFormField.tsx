import React from "react";
import { Field } from "react-final-form";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";
import imageCompression from "browser-image-compression";

const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  id,
  input,
  meta,
  ...rest
}) => {
  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | Blob | undefined;
    if (target.files && target.files[0]) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };
      file = await imageCompression(target.files[0], options);
      if (!!file) {
        input.onChange(file);
      } else {
        input.onChange(target.files[0]);
      }
    }
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
