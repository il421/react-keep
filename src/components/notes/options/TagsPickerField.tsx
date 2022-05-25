import React, { FunctionComponent } from "react";

import { FlexWrap, JustifyContent, nameOf } from "../../../common";
import { ListItem, Tag } from "../../../store/store.types";
import "../../../styles/components/notes/_tags-picker.scss";
import { CheckboxGroupField } from "../../form/CheckboxGroupField";
import { FlexBox } from "../../ui-components";
import { NoteFormValues } from "../notes.types";

interface TagsPickerFieldProps {
  tags: Tag[];
}
export const TagsPickerField: FunctionComponent<TagsPickerFieldProps> = ({
  tags
}) => {
  const nameOfField = nameOf<NoteFormValues<string | ListItem[]>>();

  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      className="tags-picker"
      flexWrap={FlexWrap.wrap}
    >
      <CheckboxGroupField
        name={nameOfField("tags")}
        options={tags}
        classNames={{
          option: "tags-picker__wrapper",
          checkbox: "tags-picker__checkbox",
          label: "tags-picker__value"
        }}
      />
    </FlexBox>
  );
};
