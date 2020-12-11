import React from "react";
import { AlignItems, JustifyContent } from "../../common";
import { FlexBox, IconButton } from "../ui-components";
import "../../styles/components/common/_controllers.scss";
import { NoteType } from "../notes";

interface Controllers extends Partial<Pick<HTMLElement, "className">> {
  isMobile?: boolean;
  openDialog: (type: NoteType) => void;
}

export const Controllers: React.FunctionComponent<Controllers> = ({
  className,
  isMobile = false,
  openDialog,
}) => {
  const handleOnClick = (type: NoteType) => () => openDialog(type);

  return (
    <div
      className={`controllers  ${
        isMobile && "controllers--mobile"
      } ${className}`}
    >
      <FlexBox
        vertical={isMobile}
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
      >
        <IconButton
          className="controllers__text"
          onButtonClick={handleOnClick(NoteType.text)}
          icon="align-left"
          size="2x"
        />

        <IconButton
          className="controllers__list"
          onButtonClick={handleOnClick(NoteType.list)}
          icon="check-square"
          size="2x"
        />

        <IconButton
          className="controllers__image"
          onButtonClick={handleOnClick(NoteType.image)}
          icon="image"
          size="2x"
        />
      </FlexBox>
    </div>
  );
};
