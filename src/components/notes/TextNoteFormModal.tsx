import React from "react";
import Modal from "react-modal";
import { NoteFormValues, NoteType } from "./notes.types";
import { isModal, nameOf, Placeholders } from "../../common";
import { PathNames, QueryKeys } from "../../routers/Routing";
import { TextInputField } from "../form/index";
import "../../styles/components/notes/_note-form.scss";
import NoteForm from "./NoteForm";
import { History } from "history";

interface TextNoteFormModalProps {
  history: History;
}
class TextNoteFormModal extends React.Component<TextNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<string>>();

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.text,
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
        <NoteForm type={NoteType.text}>
          <TextInputField
            isTextArea={true}
            name={this.nameOf("content")}
            placeholder={Placeholders.content}
            className="note-form__text"
          />
        </NoteForm>
      </Modal>
    );
  }
}

export default TextNoteFormModal;
