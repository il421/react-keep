import React from "react";
import { FlexBox } from "../ui-components/FlexBox";
import { AlignItems, JustifyContent } from "../../common/variables";
import { Tag } from "../../store/store.types";
import { IconButton } from "../ui-components/IconButton";
import "../../styles/components/tags/_tags-item.scss";

interface TagsItemProps {
  tag: Tag;
  removeTag: (id: string) => void;
  checked: boolean;
  onChange: (id: string) => void;
}

class TagsItem extends React.PureComponent<TagsItemProps> {
  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
        className="tags-item"
      >
        <FlexBox justifyContent={JustifyContent.start}>
          <div className="tags-item__checkbox">
            <input
              ref={`${this.props.tag.id}-list`}
              id={`${this.props.tag.id}-list`}
              type="checkbox"
              checked={this.props.checked}
              onChange={() => this.props.onChange(this.props.tag.id)}
            />
            <label htmlFor={`${this.props.tag.id}-list`} />
          </div>
          <div className="tags-item__value">{this.props.tag.value}</div>
        </FlexBox>

        <IconButton
          icon="times"
          onButtonClick={() => this.props.removeTag(this.props.tag.id)}
        />
      </FlexBox>
    );
  }
}

export default TagsItem;
