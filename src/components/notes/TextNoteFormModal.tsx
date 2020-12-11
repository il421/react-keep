import React from "react";
import Modal from "react-modal";
import { NoteFormValues, NoteType } from "./notes.types";
import { isModal, nameOf, Placeholders } from "../../common";
import { PathNames, QueryKeys } from "../../routers/Routing";
import { TextInputField } from "../form";
import "../../styles/components/notes/_note-form.scss";
import { NoteForm } from "./NoteForm";
import { History } from "history";

export interface TextNoteFormModalProps {
  history: History;
}
export class TextNoteFormModal extends React.Component<TextNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<string>>();

  private onRequestClose = () => this.props.history.push(PathNames.base);

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
        onRequestClose={this.onRequestClose}
        closeTimeoutMS={200}
        className="note-modal"
        ariaHideApp={false}
      >
        <NoteForm type={NoteType.text} history={this.props.history}>
          <TextInputField
            autoFocus={true}
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
