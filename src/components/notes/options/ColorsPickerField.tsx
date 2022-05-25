import React, { FunctionComponent } from "react";

import { JustifyContent, PickerColors, nameOf } from "../../../common";
import { ListItem } from "../../../store/store.types";
import "../../../styles/components/notes/_colors-picker.scss";
import { RadioButtonsInputField } from "../../form";
import { FlexBox } from "../../ui-components";
import { NoteFormValues } from "../notes.types";

export const ColorsPickerField: FunctionComponent = () => {
  const nameOfField = nameOf<NoteFormValues<string | ListItem[]>>();
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="colors-picker"
      >
        {Object.values(PickerColors).map((color: string) => (
          <RadioButtonsInputField
            id={`color-icon-${color}`}
            key={color}
            name={nameOfField("color")}
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
