import React from "react";
import { FlexBox } from "../ui-components/FlexBox";
import { AlignItems, JustifyContent } from "../../common/variables";
import { CheckboxInputField } from "../form/CheckboxInputField";
import { TextInputField } from "../form/TextInputField";
import { IconButton } from "../ui-components/IconButton";
import "../../styles/components/notes/_list-note-form-item.scss";

interface ListNoteFromItemProps {
  name: string;
  onRemove: () => void;
}

export const ListNoteFromItem: React.FunctionComponent<ListNoteFromItemProps> = ({
  name,
  onRemove
}) => {
  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      alignItems={AlignItems.start}
      className="list-note-form-item"
    >
      {/* @TODO for drag and drop */}
      {/*<FontAwesomeIcon*/}
      {/*  icon={"th"}*/}
      {/*  className="list-note-form-item__mover"*/}
      {/*  size="lg"*/}
      {/*/>*/}
      <CheckboxInputField
        name={`${name}.checked`}
        className="list-note-form-item__check"
        id={`${name}.checked`}
      />
      <TextInputField
        isTextArea={true}
        name={`${name}.content`}
        placeholder="Type something ..."
        className="list-note-form-item__text"
      />
      <IconButton
        onButtonClick={onRemove}
        icon={"times"}
        className="list-note-form-item__remove"
      />
    </FlexBox>
  );
};
