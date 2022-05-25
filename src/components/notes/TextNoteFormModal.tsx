import { History } from "history";
import { parse } from "query-string";
import React from "react";
import Modal from "react-modal";

import { isModal, nameOf, Placeholders } from "../../common";
import { PathNames, QueryKeys, RouteActions } from "../../routers/Routing";
import "../../styles/components/notes/_note-form.scss";
import { TextInputField } from "../form";
import { NoteForm } from "./NoteForm";
import { NoteFormValues, NoteType } from "./notes.types";

export interface TextNoteFormModalProps {
  history: History;
}
export class TextNoteFormModal extends React.Component<TextNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<string>>();

  private onRequestClose = () => this.props.history.push(PathNames.base);

  private isNewNote: boolean =
    parse(this.props.history.location.search)[QueryKeys.text] ===
    RouteActions.add;

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.text
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
            autoFocus={this.isNewNote}
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
