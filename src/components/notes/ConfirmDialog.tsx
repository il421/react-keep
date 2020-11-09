import React from "react";
import { FlexBox, ConfirmButton } from "../ui-components";
import { AlignItems, JustifyContent } from "../../common";
import "../../styles/components/notes/_confirm-dialog.scss";

/**
 * This component works only as a part of Note for now.
 */

export interface ConfirmDialogProps extends Pick<HTMLElement, "className"> {
  handleConfirm: () => void;
  closeDialog: () => void;
  buttonsProps?: {
    confirmButtonText?: string;
    cancelButtonText?: string;
  };
  title?: string;
}

export const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  className,
  closeDialog,
  handleConfirm,
  buttonsProps,
  title,
}) => {
  return (
    <FlexBox
      vertical
      className={`${className} confirm-dialog`}
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
    >
      {title && <div className="confirm-dialog__title">{title}</div>}
      <FlexBox
        className="confirm-dialog__wrapper"
        justifyContent={JustifyContent.spaceAround}
      >
        <ConfirmButton
          id="test-confirm-dialog-delete-btn"
          type="button"
          text={buttonsProps?.confirmButtonText! ?? "Delete"}
          wrapperClassName="confirm-dialog__button"
          onClick={(evt) => {
            evt?.stopPropagation();
            handleConfirm();
          }}
        />

        <ConfirmButton
          id="test-confirm-dialog-dont-btn"
          type="button"
          text={buttonsProps?.cancelButtonText! ?? "Don't"}
          wrapperClassName="confirm-dialog__button"
          onClick={(evt) => {
            evt?.stopPropagation();
            closeDialog();
          }}
        />
      </FlexBox>
    </FlexBox>
  );
};
