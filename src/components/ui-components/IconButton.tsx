import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import "../../styles/ui-components/_icon-button.scss";

export interface IconButtonProps extends FontAwesomeIconProps {
  onButtonClick?: (
    evt?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  pressed?: boolean;
  text?: string;
  type?: "button" | "submit";
}

export class IconButton extends React.PureComponent<IconButtonProps> {
  render() {
    const {
      onButtonClick,
      className,
      disabled,
      type = "button",
      id,
      text,
      pressed,
      ...rest
    } = this.props;
    return (
      <button
        id={id}
        className={`icon-button ${className} ${
          pressed ? "icon-button--pressed" : ""
        }`}
        onClick={onButtonClick}
        disabled={disabled}
        type={type}
      >
        <FontAwesomeIcon {...rest} />
        {this.props.text && <div className="icon-button__text">{text}</div>}
      </button>
    );
  }
}
