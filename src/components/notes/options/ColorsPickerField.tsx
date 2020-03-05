import React from "react";
import { FlexBox } from "../../ui-components";
import { JustifyContent, PickerColors } from "../../../common/variables";
import { RadioButtonsInputField } from "../../form";
import "../../../styles/components/notes/_colors-picker.scss";

class ColorsPickerField extends React.PureComponent {
  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="colors-picker"
      >
        {Object.values(PickerColors).map((color: string) => (
          <RadioButtonsInputField
            key={color}
            name="color"
            radioClassName="colors-picker__item"
            value={color}
            labelProps={{
              style: { backgroundColor: color, cursor: "pointer" }
            }}
          />
        ))}
      </FlexBox>
    );
  }
}

export default ColorsPickerField;
