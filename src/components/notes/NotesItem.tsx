import React, { useState } from "react";
import moment from "moment";
import { Note } from "../../store/store.types";
import { ContentContainer, FlexBox, IconButton } from "../ui-components";
import {
  AlignItems,
  Colors,
  FlexWrap,
  JustifyContent,
} from "../../common/variables";
import ConfirmDialog from "./ConfirmDialog";
import "../../styles/components/notes/_note.scss";
import NoteContent from "./NoteContent";
import { NoteType } from "./notes.types";
import NoteTag from "./NoteTag";

interface NoteProps {
  note: Note;
  removeNote: (id: string) => void;
  toggleImportance: (id: string) => void;
  onNoteSelected: (type: NoteType, id: string) => void;
}

const NotesItem: React.FunctionComponent<NoteProps> = ({
  note,
  removeNote,
  toggleImportance,
  onNoteSelected,
}): JSX.Element => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  return (
    <ContentContainer
      className="note"
      style={{ backgroundColor: note.color }}
      onClick={() => onNoteSelected(note.type, note.id)}
    >
      <FlexBox vertical justifyContent={JustifyContent.spaceBetween}>
        {/*actions*/}
        <FlexBox
          className="note__actions"
          justifyContent={JustifyContent.spaceBetween}
          alignItems={AlignItems.center}
        >
          <IconButton
            onButtonClick={(evt) => {
              evt?.stopPropagation();
              toggleImportance(note.id);
            }}
            icon="bookmark"
            color={note.important ? Colors.red : Colors.lightGray}
          />
          <IconButton
            onButtonClick={(evt) => {
              evt?.stopPropagation();
              setIsConfirm(true);
            }}
            icon="times"
          />
        </FlexBox>

        {/*title and content*/}
        <FlexBox
          className="note__content content"
          vertical
          justifyContent={JustifyContent.spaceBetween}
        >
          {!!note.title.trim() && (
            <h2 className="content__title">{note.title}</h2>
          )}
          <NoteContent type={note.type} content={note.content} />
        </FlexBox>

        {/*date and tags*/}
        <FlexBox
          className="note__details details"
          vertical
          justifyContent={JustifyContent.spaceBetween}
        >
          <div className="details__date">
            {moment(note.updatedAt).format("MMMM Do, YYYY")}
          </div>

          <FlexBox
            className="details__tags"
            justifyContent={JustifyContent.start}
            flexWrap={FlexWrap.wrap}
          >
            {note.tags.map((tagId, index) => (
              <NoteTag key={index} tagId={tagId} />
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>

      {isConfirm && (
        <ConfirmDialog
          className="note__confirm"
          closeDialog={() => setIsConfirm(false)}
          removeNote={() => {
            removeNote(note.id);
            setIsConfirm(false);
          }}
        />
      )}
    </ContentContainer>
  );
};

export default NotesItem;
