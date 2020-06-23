import React, { CSSProperties } from "react";
import { Field } from "react-final-form";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/ui-components/_icon-radio.scss";

/**
 * RadioButtonInputField is based on Field component
 * @param input - <ExposedFieldProps<string, HTMLElement>
 * @param radioClassName - wrapper className
 * @param labelProps - optional, LabelProps - can set label style, or iconName to use IconButton as a label
 */

interface RadioButtonsInputProps {
  radioClassName: string;
  labelProps?: LabelProps;
}

interface LabelProps {
  iconName?: IconProp;
  style?: CSSProperties;
}

const FieldAdapter: React.FunctionComponent<
  FieldAdapterProps & RadioButtonsInputProps
> = ({ radioClassName, labelProps, input: { value, ...input } }) => {
  return (
    <div className={radioClassName}>
      <input id={value} {...input} type="radio" value={value} />

      <label htmlFor={value} style={labelProps?.style}>
        {labelProps && labelProps.iconName && (
          <FontAwesomeIcon
            icon={labelProps?.iconName}
            className={`icon-radio ${input.checked && "icon-radio--checked"}`}
          />
        )}
      </label>
    </div>
  );
};

export const RadioButtonsInputField: React.FunctionComponent<
  ExposedFieldProps<string, HTMLElement> & RadioButtonsInputProps
> = (props: ExposedFieldProps<string, HTMLElement>) => (
  <Field {...props} type="radio" component={FieldAdapter} />
);
