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
}

export class IconButton extends React.PureComponent<IconButtonProps> {
  render() {
    const { onButtonClick, className, disabled, ...rest } = this.props;
    return (
      <button
        className={`${className} icon-button`}
        onClick={onButtonClick}
        disabled={disabled}
      >
        <FontAwesomeIcon {...rest} />
      </button>
    );
  }
}
