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
        id={id}
        type="file"
        onChange={handleChange}
        {...rest}
        accept="image/*"
      />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

export const FileFormField: React.FunctionComponent<
  ExposedFieldProps<string, HTMLElement> & {
    className: string;
    id?: string;
  }
> = (props) => <Field {...props} name={props.name} component={FieldAdapter} />;
