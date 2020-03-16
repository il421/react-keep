import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import "../../styles/ui-components/_icon-button.scss";

interface IconButtonProps extends FontAwesomeIconProps {
  onButtonClick: (
    evt?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  className?: string;
  disabled?: boolean;
  text?: string;
}

export class IconButton extends React.PureComponent<IconButtonProps> {
  render() {
    const { onButtonClick, className, disabled, ...rest } = this.props;
    return (
      <button
        className={`icon-button ${className} `}
        onClick={onButtonClick}
        disabled={disabled}
        type="button"
      >
        {this.props.text && (
          <div className="icon-button__text">{this.props.text}</div>
        )}
        <FontAwesomeIcon {...rest} />
      </button>
    );
  }
}
