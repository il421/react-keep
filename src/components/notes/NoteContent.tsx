import React from "react";
import { NoteType } from "./notes.types";
import { ImageItem, ListItem } from "../../store/store.types";
import { getShortText } from "../../common";

interface NoteContentProps {
  type: NoteType;
  content: string | ListItem[] | ImageItem;
}

const NoteContent: React.FunctionComponent<NoteContentProps> = ({
  type,
  content,
}): JSX.Element => {
  const NO_IMAGE_URL: string = "img/no_image.png";
  return (
    <>
      {/* TEXT NOTE */}
      {type === NoteType.text ? (
        <div className="content__text">{getShortText(content as string)}</div>
      ) : /* LIST NOTE */
      type === NoteType.list ? (
        <ul className={"content__list list"}>
          {/* show 10 lines */}
          {(content as ListItem[])
            .slice(0, 10)
            .sort(
              (a: ListItem, b: ListItem) =>
                Number(a.checked) - Number(b.checked)
            )
            .map((item, index) => (
              <li key={index}>
                <div
                  className={`list__box ${
                    item.checked && "list__box--checked"
                  }`}
                />
                <span className="list__text">{getShortText(item.content)}</span>
              </li>
            ))}

          {/* show "..." if length is more than 10 */}
          {(content as ListItem[]).length > 10 && <div>......</div>}
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
            alt="Picture of the note"
          />
          <div className="content__text">
            {getShortText((content as ImageItem).text)}
          </div>
        </div>
      )}
    </>
  );
};

export default NoteContent;
