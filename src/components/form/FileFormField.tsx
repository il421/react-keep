import React from "react";
import { Field } from "react-final-form";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";
import Dropzone from "react-dropzone";

// @TODO need to complete
const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  input,
  meta,
  name,
  ...rest
}) => {
  return (
    <div className={className}>
      <Dropzone {...input}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>hihi</p>
          </div>
        )}
      </Dropzone>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

export const FileFormField: React.FunctionComponent<ExposedFieldProps<string, HTMLElement>
  & {
  className: string,
}> = (props) => (
  <Field
    {...props}
    name={props.name}
    component={FieldAdapter}
    parse={(value: string) => value.trim() ?? ""}
  />
);
