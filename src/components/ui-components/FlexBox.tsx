import React, { CSSProperties } from "react";
import { AlignItems, JustifyContent } from "../../common/variables";

interface FlexBoxProps extends Partial<Pick<HTMLElement, "className">> {
  vertical?: boolean;
  justifyContent: JustifyContent;
  alignItems?: AlignItems;
  width?: string;
}

/**
 * Flex box components is latterly is flex box styled block.
 * @param FlexBoxProps
 */

export class FlexBox extends React.PureComponent<FlexBoxProps> {
  private style: CSSProperties = {
    display: "flex",
    width: this.props.width,
    flexDirection: this.props.vertical ? "column" : "row",
    justifyContent: this.props.justifyContent,
    alignItems: this.props.alignItems ?? AlignItems.inherit
  };

  render() {
    return (
      <div style={this.style} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
