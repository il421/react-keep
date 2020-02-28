import React from "react";
import { FlexBox } from "../../ui-components/FlexBox";
import { JustifyContent, PickerColors } from "../../../common/variables";
import "../../../styles/components/notes/_colors-picker.scss";
import { RadioButtonsInputField } from "../../form/RadioButtonsInputField";

class ColorsPickerField extends React.PureComponent {
  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="colors-picker"
      >
        {
          Object.values(PickerColors).map((color: string) => (
            <RadioButtonsInputField
              key={ color }
              name="color"
              radioClassName="colors-picker__item"
              value={ color }
              labelProps={{
                style: { backgroundColor: color, cursor: "pointer" },
              }}
            />
          ))
        }
      </FlexBox>
    );
  }
}

export default ColorsPickerField;
