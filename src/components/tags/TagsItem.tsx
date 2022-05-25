import React, { FunctionComponent } from "react";

import { AlignItems, JustifyContent } from "../../common";
import { Tag } from "../../store/store.types";
import "../../styles/components/tags/_tags-item.scss";
import { FlexBox, IconButton } from "../ui-components";

export interface TagsItemProps {
  tag: Tag;
  removeTag: (id: string) => void;
  checked: boolean;
  onChange: (id: string) => void;
}

export const TagsItem: FunctionComponent<TagsItemProps> = ({
  tag,
  removeTag,
  checked,
  onChange
}) => {
  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      alignItems={AlignItems.center}
      className="tags-item"
    >
      <FlexBox justifyContent={JustifyContent.start}>
        <div className="tags-item__checkbox">
          <input
            ref={`${tag.id}-list`}
            id={`${tag.id}-list`}
            type="checkbox"
            checked={checked}
            onChange={() => onChange(tag.id)}
          />
          <label htmlFor={`${tag.id}-list`} />
        </div>
        <div className="tags-item__value">{tag.value}</div>
      </FlexBox>

      <IconButton icon="times" onButtonClick={() => removeTag(tag.id)} />
    </FlexBox>
  );
};
