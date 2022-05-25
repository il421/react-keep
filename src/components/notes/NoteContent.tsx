import React from "react";

import { getShortText } from "../../common";
import { ImageItem, ListItem } from "../../store/store.types";
import { NoteType } from "./notes.types";

export interface NoteContentProps {
  type: NoteType;
  content: string | ListItem[] | ImageItem;
}

export const NoteContent: React.FunctionComponent<NoteContentProps> = ({
  type,
  content
}): JSX.Element => {
  const NO_IMAGE_URL: string = "img/no_image.png";
  return (
    <>
      {/* TEXT NOTE */}
      {type === NoteType.text ? (
        <div className="content__text">{getShortText(content as string)}</div>
      ) : /* LIST NOTE */
      type === NoteType.list ? (
        <ul className="content__list list">
          {/* show 3 lines */}
          {(content as ListItem[])
            .slice(0, 3)
            .sort(
              (a: ListItem, b: ListItem) =>
                Number(a.checked) - Number(b.checked)
            )
            .map(item => (
              <li key={item.id}>
                <div
                  className={`list__box ${
                    item.checked && "list__box--checked"
                  }`}
                />
                <span className="list__text">{getShortText(item.content)}</span>
              </li>
            ))}

          {/* show "..." if length is more than 3 */}
          {(content as ListItem[]).length > 3 && <div>......</div>}
        </ul>
      ) : (
        /* IMAGE NOTE */
        <div className="content__image">
          <img
            src={
              (content as ImageItem).imageUrl !== null
                ? (content as ImageItem).imageUrl!
                : NO_IMAGE_URL
            }
          />
          <div className="content__text">
            {getShortText((content as ImageItem).text)}
          </div>
        </div>
      )}
    </>
  );
};
