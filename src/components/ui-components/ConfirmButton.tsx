import React from "react";
import { BeatLoader } from "react-spinners";
import { FlexBox } from "./FlexBox";
import "../../styles/ui-components/_login-button.scss";
import { Colors, JustifyContent } from "../../common";

export interface ConfirmButtonProps
  extends Partial<Pick<HTMLButtonElement, "disabled" | "className" | "id">> {
  text: string;
  loading?: boolean;
  type?: "submit" | "button";
  onClick?: (evt?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  wrapperClassName?: string;
}

export class ConfirmButton extends React.PureComponent<ConfirmButtonProps> {
  render() {
    const {
      type = "submit",
      loading,
      className = "login-button",
      text,
      disabled = false,
      onClick,
      id,
      wrapperClassName,
    } = this.props;
    return (
      <FlexBox
        className={wrapperClassName}
        justifyContent={JustifyContent.center}
      >
        {!loading ? (
          <button
            id={id}
            className={className}
            type={type}
            disabled={disabled}
            onClick={onClick}
          >
            {text}
          </button>
        ) : (
          <BeatLoader
            size={10}
            color={Colors.fresh}
            css={
              "height: 42px; margin-bottom: 12px; display: flex; align-items: center"
            }
          />
        )}
      </FlexBox>
    );
  }
}
