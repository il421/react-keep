import React from "react";
import { BeatLoader } from "react-spinners";
import { Colors, JustifyContent } from "../../common/variables";
import { FlexBox } from "./FlexBox";
import "../../styles/ui-components/_login-button.scss";

interface ConfirmButtonProps
  extends Partial<Pick<HTMLButtonElement, "disabled" | "className">> {
  text: string;
  loading?: boolean;
  type?: "submit" | "button";
  onCLick?: (evt?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  wrapperClassName?: string;
}

export class ConfirmButton extends React.PureComponent<ConfirmButtonProps> {
  render() {
    const {
      type = "submit",
      loading,
      className,
      text,
      disabled = false,
      onCLick,
      wrapperClassName,
    } = this.props;
    return (
      <FlexBox
        className={wrapperClassName}
        justifyContent={JustifyContent.center}
      >
        {!loading ? (
          <button
            className={className}
            type={type}
            disabled={disabled}
            onClick={onCLick}
          >
            {text}
          </button>
        ) : (
          <BeatLoader
            size={10}
            color={Colors.fresh}
            css={"height: 42px; display: flex; align-items: center"}
          />
        )}
      </FlexBox>
    );
  }
}
