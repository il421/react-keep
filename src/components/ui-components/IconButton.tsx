import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import "../../styles/ui-components/_icon-button.scss";

interface IconButtonProps extends FontAwesomeIconProps {
  onClick: (evt?: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export class IconButton extends React.PureComponent<IconButtonProps> {
  render() {
    const { onClick, className, disabled, ...rest } = this.props;
    return (
      <button
        className={`${className} icon-button`}
        onClick={onClick}
        disabled={disabled}
      >
        <FontAwesomeIcon {...rest} />
      </button>
    );
  }
}
