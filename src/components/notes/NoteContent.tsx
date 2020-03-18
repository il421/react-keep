import React from "react";
import { NoteType } from "./notes.types";
import { ListItem } from "../../store/store.types";

interface NoteContentProps {
  type: NoteType;
  content: string | ListItem[];
}

const NoteContent: React.FunctionComponent<NoteContentProps> = ({
  type,
  content
}): JSX.Element => {
  return (
    <>
      {type === NoteType.text ? (
        <div className="content__text">{content}</div>
      ) : (
        <ul className={"content__list list"}>
          {(content as ListItem[]).map((item, index) => (
            <li key={index}>
              <div
                className={`list__box ${item.checked && "list__box--checked"}`}
              />
              <span className="list__text">{item.content}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NoteContent;
