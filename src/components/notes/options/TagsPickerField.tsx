import React from "react";
import { FlexBox } from "../../ui-components";
import { FlexWrap, JustifyContent } from "../../../common/variables";
import { CheckboxInputField } from "../../form/CheckboxInputField";
import { Tag } from "../../../store/store.types";
import "../../../styles/components/notes/_tags-picker.scss";

interface TagsPickerFieldProps {
  tags: Tag[];
}
export class TagsPickerField extends React.PureComponent<TagsPickerFieldProps> {
  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="tags-picker"
        flexWrap={FlexWrap.wrap}
      >
        {this.props.tags.map((tag: Tag, index: number) => (
          <FlexBox
            key={tag.id}
            justifyContent={JustifyContent.start}
            className="tags-picker__wrapper"
          >
            <CheckboxInputField
              id={`tags[${index}]`}
              name={`tags[${index}]`}
              className="tags-picker__checkbox"
              value={tag.id}
            />
            <div className="tags-picker__value">{tag.value}</div>
          </FlexBox>
        ))}
      </FlexBox>
    );
  }
}

export default TagsPickerField;
