/* eslint-disable indent */
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Modal from "react-modal";
import { AddNote, Note, Store, UpdateNote } from "../../store/store.types";
import { NoteType } from "./notes.types";
import { PickerColors } from "../../common/variables";
import ColorsPickerField from "./options/ColorsPickerField";
import { isModal, nameOf, Placeholders } from "../../common";
import { PathNames, QueryKeys, RouteActions } from "../../routers/Routing";
import { ContentContainer } from "../ui-components/index";
import {
  BaseFormOptions,
  FieldSpy,
  TextInputField,
  BaseForm
} from "../form/index";
import { FormRenderProps, FormSpy } from "react-final-form";
import { handleAddNote, handleUpdateNote } from "../../actions/notes";
import "../../styles/components/notes/_note-form.scss";
import { ThunkDispatch } from "redux-thunk";
import { parse } from "query-string";
import moment from "moment";

interface TextNoteFormValues
  extends Omit<Note, "id" | "important" | "createdAt" | "updatedAt"> {
  currentOption: BaseFormOptions;
}

interface StateProps {
  notes: Note[];
}

interface DispatchProps {
  addNote: (note: AddNote) => void;
  updateNote: (id: string, note: UpdateNote) => void;
}

type Props = RouteComponentProps & DispatchProps & StateProps;

class TextNoteFormModal extends React.Component<Props> {
  private defaultTextNote: TextNoteFormValues = {
    type: NoteType.text,
    title: "",
    content: "",
    tags: [],
    color: PickerColors.white,
    currentOption: BaseFormOptions.times
  };

  private nameOf = nameOf<TextNoteFormValues>();
  private getInitialState = () => {
    const id = parse(this.props.history.location.search).text;
    if (id && id !== RouteActions.add) {
      const notes: Note[] = this.props.notes.filter((n: Note) => n.id === id);
      return notes[0];
    }

    return null;
  };

  state = {
    currentNote: this.getInitialState(),
    currentNoteColor:
      this.getInitialState()?.color ?? this.defaultTextNote.color
  } as { currentNoteColor: PickerColors; currentNote: Note | null };

  private getInitialsValues = (): TextNoteFormValues => {
    if (this.state.currentNote) {
      const { title, color, content, tags } = this.state.currentNote;
      return {
        type: NoteType.text,
        title,
        content,
        tags,
        color,
        currentOption: BaseFormOptions.times
      };
    }
    return this.defaultTextNote;
  };

  private onSubmitAction = async (
    values: TextNoteFormValues
  ): Promise<void> => {
    // eslint-disable-next-line
    const { currentOption, ...note } = values;

    if (this.state.currentNote) {
      const update: UpdateNote = {
        ...this.state.currentNote,
        ...note,
        updatedAt: moment().valueOf()
      };

      await this.props.updateNote(this.state.currentNote.id, update);
    } else {
      await this.props.addNote(note);
    }

    this.props.history.push(PathNames.base);
  };

  render() {
    console.log("TextNoteModal");

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
        onRequestClose={() => this.props.history.push(PathNames.base)}
        closeTimeoutMS={200}
        className="note-modal"
        ariaHideApp={false}
      >
        <ContentContainer
          className="note-modal__container"
          style={{
            backgroundColor: this.state.currentNoteColor
          }}
        >
          <BaseForm<TextNoteFormValues>
            initialValues={this.getInitialsValues()}
            onSubmit={this.onSubmitAction}
            onCancel={() => this.props.history.push(PathNames.base)}
            submitButtonName={this.state.currentNote ? "Update" : undefined}
            getFormOptions={
              <FormSpy>
                {({ values }: FormRenderProps<TextNoteFormValues>) => {
                  switch (values.currentOption) {
                    case BaseFormOptions.palette:
                      return <ColorsPickerField />;
                    default:
                      return null;
                  }
                }}
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

const mapStateToProps = (state: Store): StateProps => ({
  notes: state.notes
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  addNote: (note: AddNote) => dispatch(handleAddNote(note)),
  updateNote: (id: string, note: UpdateNote) =>
    dispatch(handleUpdateNote(id, note))
});

export default withRouter(
  connect<StateProps, DispatchProps, RouteComponentProps, Store>(
    mapStateToProps,
    mapDispatchToProps
  )(TextNoteFormModal)
);
