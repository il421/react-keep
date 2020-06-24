import React from "react";
import { FlexBox } from "../../ui-components";
import { JustifyContent, PickerColors, nameOf } from "../../../common";
import { RadioButtonsInputField } from "../../form";
import "../../../styles/components/notes/_colors-picker.scss";
import { NoteFormValues } from "../notes.types";
import { ListItem } from "../../../store/store.types";

class ColorsPickerField extends React.PureComponent {
  private nameOf = nameOf<NoteFormValues<string | ListItem[]>>();

  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="colors-picker"
      >
        {Object.values(PickerColors).map((color: string) => (
          <RadioButtonsInputField
            id={`color-icon-${color}`}
            key={color}
            name={this.nameOf("color")}
            radioClassName="colors-picker__item"
            value={color}
            labelProps={{
              style: { backgroundColor: color, cursor: "pointer" },
            }}
          />
        ))}
      </FlexBox>
    );
  }
}

export default ColorsPickerField;
