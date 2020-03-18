import React from "react";
import { NoteType } from "./notes.types";
import { ListItem } from "../../store/store.types";
import { getShortText } from "../../common/utils";

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
        <div className="content__text">{getShortText(content as string)}</div>
      ) : (
        <>
          <ul className={"content__list list"}>
            {/* show 10 lines */}
            {(content as ListItem[]).slice(0, 10).map((item, index) => (
              <li key={index}>
                <div
                  className={`list__box ${item.checked &&
                    "list__box--checked"}`}
                />
                <span className="list__text">{getShortText(item.content)}</span>
              </li>
            ))}

            {/* show "..." if length is more than 10 */}
            {(content as ListItem[]).length > 10 && <div>......</div>}
          </ul>
        </>
      )}
    </>
  );
};

export default NoteContent;
