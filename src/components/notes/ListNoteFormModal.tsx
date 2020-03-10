import React from "react";
import Modal from "react-modal";
import { ListItem } from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { isModal, nameOf } from "../../common";
import { PathNames, QueryKeys } from "../../routers/Routing";
import "../../styles/components/notes/_note-form.scss";
import NoteForm from "./NoteForm";
import { History } from "history";
import { FieldArray } from "react-final-form-arrays";

interface ListNoteFormModalProps {
  history: History;
}
class ListNoteFormModal extends React.Component<ListNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<ListItem[]>>();

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.list
      })
    ) {
      return null;
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.history.push(PathNames.base)}
        closeTimeoutMS={200}
        className="note-modal"
        ariaHideApp={false}
      >
        <NoteForm type={NoteType.list}>
          <FieldArray name={this.nameOf("content")}>
            {({ fields }) =>
              fields.map((name, index) => <div key={index}>{name}</div>)
            }
          </FieldArray>
        </NoteForm>
      </Modal>
    );
  }
}

export default ListNoteFormModal;
