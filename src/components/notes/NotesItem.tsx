import React, { useState } from "react";
import moment from "moment";
import { Collaborator, Note } from "../../store/store.types";
import { ContentContainer, FlexBox, IconButton } from "../ui-components";
import { AlignItems, Colors, FlexWrap, JustifyContent } from "../../common";
import { ConfirmDialog } from "./ConfirmDialog";
import "../../styles/components/notes/_note.scss";
import { NoteContent } from "./NoteContent";
import { NoteType } from "./notes.types";
import { NoteTag } from "./NoteTag";
import { Coin } from "../ui-components/Coin";

export interface NoteProps {
  note: Note;
  removeNote: (id: string) => void;
  moveToArchive: (id: string) => void;
  toggleImportance: (id: string) => void;
  getCollaborator: (uid: string) => Collaborator | undefined;
  onNoteSelected: (type: NoteType, id: string) => void;
}

export type Confirm = "del" | "arch" | null;

export const NotesItem: React.FunctionComponent<NoteProps> = ({
  note,
  removeNote,
  moveToArchive,
  toggleImportance,
  onNoteSelected,
  getCollaborator,
}): JSX.Element => {
  const [isConfirm, setIsConfirm] = useState<Confirm>(null);

  const createdBy: Collaborator | undefined = note.createdBy
    ? getCollaborator(note.createdBy)
    : undefined;

  const collaborators: Collaborator[] = note.collaborators
    ? note.collaborators
        .map((uid) => getCollaborator(uid)!)
        .filter((c: Collaborator) => !!c)
    : [];

  return (
    <ContentContainer
      className="note"
      style={{ backgroundColor: note.color }}
      onClick={() => onNoteSelected(note.type, note.id)}
    >
      <FlexBox vertical justifyContent={JustifyContent.spaceBetween}>
        {/*actions*/}
        <FlexBox
          className="note__actions actions"
          justifyContent={
            !note.createdBy ? JustifyContent.spaceBetween : JustifyContent.end
          }
          alignItems={AlignItems.center}
        >
          {
            // don't render shared notes
            !note.createdBy && (
              <IconButton
                className="actions__important"
                onButtonClick={(evt) => {
                  evt?.stopPropagation();
                  toggleImportance(note.id);
                }}
                icon="bookmark"
                color={note.important ? Colors.red : Colors.lightGray}
                id={`test-toggle-importance-${note.id}`}
              />
            )
          }
          {/* collaborators */}
          <FlexBox
            justifyContent={JustifyContent.start}
            flexGrow
            className="actions__col-list"
          >
            {createdBy && (
              <Coin
                className="coin--owner"
                name={createdBy.displayName}
                email={createdBy.email}
                url={createdBy.photoURL}
                showTooltip
              />
            )}

            {collaborators &&
              collaborators.map((c: Collaborator, index: number) => (
                <Coin
                  key={index}
                  name={c.displayName}
                  email={c.email}
                  url={c.photoURL}
                  showTooltip
                />
              ))}
          </FlexBox>

          <FlexBox
            justifyContent={JustifyContent.start}
            alignItems={AlignItems.center}
          >
            {!note.createdBy && (
              <IconButton
                className="actions__archive"
                onButtonClick={(evt) => {
                  evt?.stopPropagation();
                  setIsConfirm("arch");
                }}
                icon="archive"
                id={`test-toggle-arch-${note.id}`}
              />
            )}

            <IconButton
              className="actions__remove"
              onButtonClick={(evt) => {
                evt?.stopPropagation();
                setIsConfirm("del");
              }}
              icon="times"
              id={`test-delete-note-${note.id}`}
            />
          </FlexBox>
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
          <FlexBox
            className="details__date"
            justifyContent={JustifyContent.spaceBetween}
          >
            <div>
              <b>Created:</b> {moment(note.createdAt).format("DD/MM/YY")}
            </div>
            <div>
              <b>Edited:</b> {moment(note.updatedAt).format("DD/MM/YY")}
            </div>
          </FlexBox>

          {note.tags.length > 0 && (
            <FlexBox
              className="details__tags"
              justifyContent={JustifyContent.start}
              flexWrap={FlexWrap.wrap}
            >
              {note.tags.map((tagId, index) => (
                <NoteTag key={index} tagId={tagId} />
              ))}
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>

      {isConfirm && (
        <ConfirmDialog
          className="note__confirm"
          closeDialog={() => setIsConfirm(null)}
          buttonsProps={{
            confirmButtonText: isConfirm === "arch" ? "Archive" : undefined,
          }}
          handleConfirm={() => {
            if (isConfirm === "del") {
              removeNote(note.id);
            } else if (isConfirm === "arch") {
              moveToArchive(note.id);
            }
            setIsConfirm(null);
          }}
        />
      )}
    </ContentContainer>
  );
};
