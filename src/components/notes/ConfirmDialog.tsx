import React from "react";
import { ConfirmButton } from "../ui-components/ConfirmButton";
import { FlexBox } from "../ui-components/FlexBox";
import { AlignItems, JustifyContent } from "../../common/variables";
import "../../styles/components/notes/_confirm-dialog.scss";

/**
 * This component works only as a part of Note for now.
 */

interface ConfirmDialogProps extends Pick<HTMLElement, "className"> {
  removeNote: () => void;
  closeDialog: () => void;
}

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  className,
  closeDialog,
  removeNote
}) => {
  return (
    <FlexBox
      className={`${className} confirm-dialog`}
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
    >
      <FlexBox
        className="confirm-dialog__wrapper"
        justifyContent={JustifyContent.spaceAround}
      >
        <ConfirmButton
          type="button"
          text="Delete"
          wrapperClassName="confirm-dialog__button"
          onCLick={removeNote}
        />

        <ConfirmButton
          type="button"
          text="Don't"
          wrapperClassName="confirm-dialog__button"
          onCLick={closeDialog}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ConfirmDialog;
