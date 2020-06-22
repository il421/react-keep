import React from "react";
import { ImageItem, ListItem, Note } from "../../store/store.types";
import { FlexBox, IconButton } from "../ui-components";
import "../../styles/components/archive/_archive-item.scss";
import { AlignItems, JustifyContent, getShortText } from "../../common";
import moment from "moment";
import { NoteType } from "../notes/notes.types";

export interface ArchiveItemProps {
  note: Note;
  unarchiveNote: (id: string) => void;
}

export const ArchiveItem: React.FunctionComponent<ArchiveItemProps> = ({
  note,
  unarchiveNote,
}) => {
  const NO_IMAGE_URL: string = "img/no_image.png";
  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      alignItems={AlignItems.baseline}
      className="archive-item"
    >
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        className="archive-item__content"
      >
        <FlexBox
          className="archive-item__wrapper"
          vertical
          justifyContent={JustifyContent.spaceBetween}
        >
          <FlexBox
            className="archive-item-content"
            justifyContent={JustifyContent.spaceBetween}
          >
            <b className="archive-item-content__title">Title:</b>
            <div className="archive-item-content__value">{note.title}</div>
          </FlexBox>

          <FlexBox
            className="archive-item-content"
            justifyContent={JustifyContent.spaceBetween}
          >
            <b className="archive-item-content__title">Text:</b>
            <div className="archive-item-content__value">
              {note.type === NoteType.text ? (
                <div>{getShortText(note.content as string, 20)}</div>
              ) : note.type === NoteType.list ? (
                <ul className="content__list list">
                  {/* show 3 lines */}
                  {(note.content as ListItem[])
                    .slice(0, 3)
                    .map((item, index) => (
                      <li key={index}>
                        <div
                          className={`list__box ${
                            item.checked && "list__box--checked"
                          }`}
                        />
                        <span className="list__text">
                          {getShortText(item.content, 10)}
                        </span>
                      </li>
                    ))}
                </ul>
              ) : (
                <div>
                  <div>
                    {getShortText((note.content as ImageItem).content, 20)}
                  </div>
                  <img
                    src={
                      (note.content as ImageItem).imageUrl !== null
                        ? (note.content as ImageItem).imageUrl!
                        : NO_IMAGE_URL
                    }
                    alt="Picture of the note"
                  />
                </div>
              )}
            </div>
          </FlexBox>

          <FlexBox
            className="archive-item-content"
            justifyContent={JustifyContent.spaceBetween}
          >
            <b className="archive-item-content__title">Created:</b>
            <div className="archive-item-content__value">
              {moment(note.createdAt).format("MMMM Do, YYYY")}
            </div>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <IconButton
        className="archive-item__icon"
        icon="arrow-right"
        onButtonClick={() => unarchiveNote(note.id)}
      />
    </FlexBox>
  );
};
