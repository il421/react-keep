import React, { FunctionComponent } from "react";

import { JustifyContent } from "../../common";
import "../../styles/components/common/_sidebar.scss";
import { IconButton, FlexBox } from "../ui-components";

export interface SideBarProp {
  showBar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export const SideBar: FunctionComponent<SideBarProp> = ({
  showBar,
  setShowSidebar,
  children
}) => {
  return (
    <>
      <div className={`sidebar ${showBar && "sidebar--show"}`}>
        <FlexBox justifyContent={JustifyContent.end}>
          <IconButton
            className="sidebar__close-button"
            onButtonClick={() => setShowSidebar(false)}
            icon="times"
            size="2x"
          />
        </FlexBox>

        {children}
      </div>

      {
        // handle click on cover to close the sidebar
        showBar && (
          <div
            className="sidebar__cover"
            onClick={() => setShowSidebar(false)}
          />
        )
      }
    </>
  );
};
