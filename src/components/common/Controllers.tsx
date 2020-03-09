import React from "react";
import { QueryKeys, RouteActions } from "../../routers/Routing";
import { useHistory } from "react-router-dom";
import { stringify } from "query-string";
import { AlignItems, JustifyContent } from "../../common/variables";
import { IconButton, FlexBox } from "../ui-components";
import "../../styles/components/common/_controllers.scss";

interface Controllers extends Partial<Pick<HTMLElement, "className">> {
  isMobile?: boolean;
}

export const Controllers: React.FunctionComponent<Controllers> = ({
  className,
  isMobile = false
}) => {
  const history = useHistory();

  const onClickHandler = (key: keyof typeof QueryKeys) => {
    const query = stringify({
      [key]: RouteActions.add
    });
    history.push(`${history.location.pathname}?${query}`);
  };

  return (
    <div
      className={`controllers  ${isMobile &&
        "controllers--mobile"} ${className}`}
    >
      <FlexBox
        vertical={isMobile}
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
      >
        <IconButton
          className="controllers__text"
          onClick={() => onClickHandler(QueryKeys.text)}
          icon="align-left"
          size="2x"
        />

        <IconButton
          className="controllers__list"
          onClick={() => onClickHandler(QueryKeys.list)}
          icon="check-square"
          size="2x"
        />

        <IconButton
          className="controllers__image"
          onClick={() => onClickHandler(QueryKeys.image)}
          icon="image"
          size="2x"
        />
      </FlexBox>
    </div>
  );
};
