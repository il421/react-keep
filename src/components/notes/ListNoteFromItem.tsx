import React from "react";
import { FlexBox, IconButton } from "../ui-components";
import { AlignItems, JustifyContent } from "../../common";
import { CheckboxInputField, FieldSpy, TextInputField } from "../form";
import "../../styles/components/notes/_list-note-form-item.scss";

export interface ListNoteFromItemProps {
  name: string;
  index: number;
  onRemove: () => void;
  onChecked: (checked: boolean, values: any) => void;
  autoFocus?: boolean;
}

export const ListNoteFromItem: React.FunctionComponent<ListNoteFromItemProps> = ({
  name,
  onRemove,
  onChecked,
  index,
  autoFocus,
}) => {
  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      alignItems={AlignItems.start}
      className="list-note-form-item"
    >
      <CheckboxInputField
        name={`${name}.checked`}
        className="list-note-form-item__check"
        id={`${name}.checked`}
      />
      <FieldSpy name={`${name}.checked`} onChange={onChecked} />
      <TextInputField
        isTextArea={true}
        name={`${name}.content`}
        placeholder="Type something ..."
        className="list-note-form-item__text"
        autoFocus={autoFocus}
      />
      <IconButton
        id={`test-item-rm-button-${index}`}
        onButtonClick={onRemove}
        icon="times"
        className="list-note-form-item__remove"
      />
    </FlexBox>
  );
};
