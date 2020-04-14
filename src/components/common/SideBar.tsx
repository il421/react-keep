import React from "react";
import { IconButton } from "../ui-components/IconButton";
import "../../styles/components/common/_sidebar.scss";
import { FlexBox } from "../ui-components/FlexBox";
import { JustifyContent } from "../../common/variables";

interface SideBarProp {
  showBar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export class SideBar extends React.PureComponent<SideBarProp> {
  render() {
    return (
      <>
        <div className={`sidebar ${this.props.showBar && "sidebar--show"}`}>
          <FlexBox justifyContent={JustifyContent.end}>
            <IconButton
              className="sidebar__close-button"
              onButtonClick={() => this.props.setShowSidebar(false)}
              icon="times"
              size="2x"
            />
          </FlexBox>

          {this.props.children}
        </div>

        {
          // handle click on cover to close the sidebar
          this.props.showBar && (
            <div
              className="sidebar__cover"
              onClick={() => this.props.setShowSidebar(false)}
            />
          )
        }
      </>
    );
  }
}
