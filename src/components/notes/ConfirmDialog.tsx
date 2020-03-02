import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { handleRemoveNote } from "../../actions/notes";

/**
 * This component works only as a part of Note for now.
 */

interface ConfirmDialogProps extends Pick<HTMLElement, "className">{
  id: string;
  removeNote: (id: string) => void;
  closeDialog: () => void;
}

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({ className, closeDialog, removeNote, id }) => {
  return (
    <div className={className}>
      <button type="button"
        onClick={() => {
          removeNote(id);
          closeDialog();
        }
        }
      >Yes</button>
      <button type="button" onClick={closeDialog}>No</button>
    </div>
  );
};


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  removeNote: (id: string) => dispatch(handleRemoveNote(id))
});


export default connect(undefined, mapDispatchToProps)(ConfirmDialog);
