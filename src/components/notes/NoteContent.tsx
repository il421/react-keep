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
        <ul>
          {(content as ListItem[]).map((item, index) => (
            <li key={index}>{item.content}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NoteContent;
