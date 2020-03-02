import React, { useState } from "react";
import moment from "moment";
import { Note } from "../../store/store.types";
import { ContentContainer, FlexBox, IconButton } from "../ui-components";
import { AlignItems, Colors, JustifyContent } from "../../common/variables";
import "../../styles/components/notes/_note.scss";
import ConfirmDialog from "./ConfirmDialog";

export interface NoteProps {
  note: Note
}

export const NotesItem:React.FunctionComponent<NoteProps> = ({ note }): JSX.Element => {

  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  return (
    <ContentContainer className="note note--animation" style={{ backgroundColor: note.color }}>
      <FlexBox vertical justifyContent={JustifyContent.spaceBetween}>
        {/*actions*/}
        <FlexBox className="note__actions" justifyContent={JustifyContent.spaceBetween} alignItems={AlignItems.center}>
          <IconButton
            onClick={() => {}}
            icon="bookmark"
            color={ note.important ? Colors.varmillion : Colors.lightGray }
          />
          <IconButton onClick={() => setIsConfirm(true)} icon="times" />
        </FlexBox>

        {/*title and content*/}
        <FlexBox className="note__content content" vertical justifyContent={JustifyContent.spaceBetween}>
          { !!note.title.trim() && <h2 className="content__title">{ note.title }</h2> }
          <div className="content__text">{ note.content }</div>
        </FlexBox>

        {/*date nad tags*/}
        <FlexBox className="note__details details"  vertical justifyContent={JustifyContent.spaceBetween}>
          <div className="details__date">{ moment(note.updatedAt).format("MMMM Do, YYYY") }</div>

          <FlexBox className="details__tags" justifyContent={JustifyContent.start}>
            tags
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {
        isConfirm && (
          <ConfirmDialog className="note__confirm" id={ note.id } closeDialog={ () => setIsConfirm(false) } />
        )
      }
    </ContentContainer>
  );
};
