import React from "react";
import "../../styles/ui-components/_link-button.scss";

interface LinkButtonProps
  extends Partial<Pick<HTMLButtonElement, "disabled" | "className" | "id">> {
  text: string;
  type: "submit" | "button";
  onClick?: (data: any) => void;
}

export class LinkButton extends React.PureComponent<LinkButtonProps> {
  render() {
    return (
      <button
        id={this.props.id}
        className={`link-button ${this.props.className}`}
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
