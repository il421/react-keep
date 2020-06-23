import React from "react";
import { QueryKeys, RouteActions } from "../../routers/Routing";
import { stringify } from "query-string";
import { AlignItems, JustifyContent } from "../../common";
import { IconButton, FlexBox } from "../ui-components";
import "../../styles/components/common/_controllers.scss";

interface Controllers extends Partial<Pick<HTMLElement, "className">> {
  isMobile?: boolean;
  openDialog: (query: string) => void;
}

export const Controllers: React.FunctionComponent<Controllers> = ({
  className,
  isMobile = false,
  openDialog,
}) => {
  const getQuery = (key: keyof typeof QueryKeys) => {
    return stringify({
      [key]: RouteActions.add,
    });
  };

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
          onButtonClick={() => openDialog(getQuery(QueryKeys.text))}
          icon="align-left"
          size="2x"
        />

        <IconButton
          className="controllers__list"
          onButtonClick={() => openDialog(getQuery(QueryKeys.list))}
          icon="check-square"
          size="2x"
        />

        <IconButton
          className="controllers__image"
          onButtonClick={() => openDialog(getQuery(QueryKeys.image))}
          icon="image"
          size="2x"
        />
      </FlexBox>
    </div>
  );
};
