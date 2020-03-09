import React, { CSSProperties, MouseEventHandler } from "react";
import "../../styles/components/common/_content-conteiner.scss";

interface ContentContainerProps
  extends Partial<Pick<HTMLDivElement, "className">> {
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export class ContentContainer extends React.PureComponent<
  ContentContainerProps
> {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={`content-container ${this.props.className}`}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
