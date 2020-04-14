import React from "react";
import { FlexBox } from "../../ui-components";
import { FlexWrap, JustifyContent, nameOf } from "../../../common";
import { ListItem, Tag } from "../../../store/store.types";
import "../../../styles/components/notes/_tags-picker.scss";
import { NoteFormValues } from "../notes.types";
import { CheckboxGroupField } from "../../form/CheckboxGroupField";

interface TagsPickerFieldProps {
  tags: Tag[];
}
export class TagsPickerField extends React.PureComponent<TagsPickerFieldProps> {
  private nameOf = nameOf<NoteFormValues<string | ListItem[]>>();

  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="tags-picker"
        flexWrap={FlexWrap.wrap}
      >
        <CheckboxGroupField
          name={this.nameOf("tags")}
          options={this.props.tags}
          classNames={{
            option: "tags-picker__wrapper",
            checkbox: "tags-picker__checkbox",
            label: "tags-picker__value",
          }}
        />
      </FlexBox>
    );
  }
}

export default TagsPickerField;
