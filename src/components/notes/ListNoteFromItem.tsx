import React from "react";
import { FlexBox, IconButton } from "../ui-components";
import { AlignItems, JustifyContent, newLineRegEx } from "../../common";
import { CheckboxInputField, FieldSpy, TextInputField } from "../form";
import "../../styles/components/notes/_list-note-form-item.scss";

export interface ListNoteFromItemProps {
  name: string;
  index: number;
  onRemove: () => void;
  onChecked: (checked: boolean, values: any) => void;
  addItem: () => void;
  autoFocus: boolean;
  isChecked: boolean;
  setPastedValue: (paste: string) => void;
}

export const ListNoteFromItem: React.FunctionComponent<ListNoteFromItemProps> = ({
  name,
  onRemove,
  onChecked,
  index,
  autoFocus,
  addItem,
  setPastedValue,
  isChecked,
}) => {
  const handleOnPaste = (
    event: React.ClipboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value: string = event.currentTarget.value.trim();
    const paste: string = event.clipboardData.getData("text").trim();
    const match: RegExpExecArray | null = newLineRegEx.exec(paste);
    // if paste contains newlines => setPastedValue
    if (value.length === 0 && paste.length > 0 && match) {
      setPastedValue(paste);
    }
  };
  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      alignItems={AlignItems.start}
      className={`list-note-form-item ${
        isChecked ? "list-note-form-item--checked" : ""
      }`}
    >
      <CheckboxInputField
        name={`${name}.checked`}
        className="list-note-form-item__check"
        id={`${name}.checked`}
      />
      <FieldSpy name={`${name}.checked`} onChange={onChecked} />
      <TextInputField
        afterPasteCallback={addItem}
        isTextArea={true}
        name={`${name}.content`}
        placeholder="Type something ..."
        className="list-note-form-item__text"
        autoFocus={autoFocus}
        onPaste={handleOnPaste}
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
