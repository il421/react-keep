import React, {Dispatch} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {BaseForm} from "../form/BaseForm";
import {AddNote, Note, NotesStoreState, Store} from "../../store/store.types";
import {NoteType} from "./notes.types";
import {PickerColors} from "../../common/variables";
import {TextInputField} from "../form/TextInputField";
import {isModal, nameOf, Placeholders} from "../../common";
import Modal from "react-modal";
import "../../styles/components/notes/_note-form.scss";
import {PathNames, QueryKeys} from "../../routers/Routing";
import {ContentContainer} from "../ui-components/ContentContainer";
import ColorsPickerField from "./options/ColorsPickerField";
import {BaseFormOptions} from "../form/BaseForm.types";
import {FormRenderProps, FormSpy} from "react-final-form";
import {FieldSpy} from "../form/FieldSpy";
import {connect} from "react-redux";
import {handleAddNote} from "../../actions/notes";

interface TextNoteFormValues extends Omit<Note, "id" | "important" | "createdAt" | "updatedAt"> {
  currentOption: BaseFormOptions
}
interface TextNoteFormModalProps extends RouteComponentProps {
  addNote: (note: AddNote) => void;
  notes: NotesStoreState
}

class TextNoteFormModal extends React.PureComponent<TextNoteFormModalProps> {
  private defaultTextNote: TextNoteFormValues = {
    type: NoteType.text,
    title: "",
    content: "",
    tags: [],
    color: PickerColors.white,
    currentOption: BaseFormOptions.times
  };

  private nameOf = nameOf<TextNoteFormValues>();

  state = {
    currentNoteColor: this.defaultTextNote.color
  } as { currentNoteColor: PickerColors };

  render() {
    return (
      <Modal
        isOpen={ isModal({query: this.props.history.location.search, type: QueryKeys.text}) }
        onRequestClose={ () => this.props.history.push(PathNames.base) }
        closeTimeoutMS={ 200 }
        className="note-modal"
        ariaHideApp={ false }
      >
        <ContentContainer
          className="note-modal__container"
          style={{ backgroundColor: this.state.currentNoteColor }}
        >
          <BaseForm<TextNoteFormValues>
            initialValues={this.defaultTextNote}
            onSubmit={
              async (values: TextNoteFormValues) => {
                const { currentOption, ...note } = values;
                await this.props.addNote(note);
                this.props.history.push(PathNames.base);
              }}
            onCancel={() => this.props.history.push(PathNames.base)}
            getFormOptions={
              <FormSpy>
                {
                  ({ values }: FormRenderProps<TextNoteFormValues>) => {
                    switch (values.currentOption) {
                    case BaseFormOptions.palette:
                      return ( <ColorsPickerField /> );
                    default:
                      return null;
                    }


                  }
                }
              </FormSpy>
            }
          >
            <TextInputField
              name={this.nameOf("title")}
              type="text"
              placeholder={Placeholders.title}
              className="note-form__title"
            />

            <TextInputField
              isTextArea={true}
              name={this.nameOf("content")}
              placeholder={Placeholders.content}
              className="note-form__text"
            />

            <FieldSpy
              name={this.nameOf("color")}
              onChange={
                // set the component color
                (currentNoteColor: PickerColors) => {
                  if (this.state.currentNoteColor !== currentNoteColor) {
                    this.setState({ currentNoteColor });
                  }
                }
              }
            />
          </BaseForm>
        </ContentContainer>
      </Modal>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addNote: (note: AddNote) => dispatch(handleAddNote(note)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TextNoteFormModal));
