import React, {CSSProperties} from "react";
import "../../styles/components/common/_content-conteiner.scss";

interface ContentContainerProps extends Partial<Pick<HTMLElement, "className">> {
  style?: CSSProperties
}

export class ContentContainer extends React.PureComponent<ContentContainerProps> {
  render() {
    return (
      <div
        className={`content-container ${ this.props.className }`}
        style={this.props.style}
      >{ this.props.children }
      </div>
    );
  }
}
