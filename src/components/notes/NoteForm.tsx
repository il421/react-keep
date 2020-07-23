import React from "react";
import { connect } from "react-redux";
import { History } from "history";
import {
  AddNote,
  CollaboratorsStoreState,
  ImageItem,
  ListItem,
  Note,
  NotesStoreState,
  Store,
  TagsStoreState,
  UpdateNote,
} from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import ColorsPickerField from "./options/ColorsPickerField";
import { nameOf, Placeholders, PickerColors } from "../../common";
import { PathNames } from "../../routers/Routing";
import { BaseForm, BaseFormOptions, FieldSpy, TextInputField } from "../form";
import { FormRenderProps, FormSpy } from "react-final-form";
import { handleAddNote, handleUpdateNote } from "../../actions/notes";
import "../../styles/components/notes/_note-form.scss";
import { ThunkDispatch } from "redux-thunk";
import moment from "moment";
import {
  getDefaultContent,
  getInitialNoteFormValues,
  getSelectedNote,
} from "./utils";
import { ContentContainer } from "../ui-components";
import TagsPickerField from "./options/TagsPickerField";
import { ValidationErrors } from "final-form";
import CollaboratorsField from "./options/CollaboratorsField";

interface StateProps {
  notes: NotesStoreState[];
  tags: TagsStoreState[];
  collaborators: CollaboratorsStoreState[];
}

interface NoteFormProps {
  history: History;
  type: NoteType;
  validate?: (
    values: NoteFormValues<string | ListItem[] | ImageItem>
  ) => ValidationErrors;
}

interface DispatchProps {
  addNote: (note: AddNote) => void;
  updateNote: (id: string, note: UpdateNote) => void;
}

interface TextNoteFormModalState {
  currentNoteColor: PickerColors;
  currentNote: Note | undefined;
}

export type Props = DispatchProps & StateProps & NoteFormProps;

export class NoteFormBase extends React.PureComponent<Props> {
  private defaultNote: NoteFormValues<string | ListItem[] | ImageItem> = {
    type: this.props.type,
    title: "",
    content: getDefaultContent(this.props.type),
    tags: [],
    color: PickerColors.white,
    currentOption: BaseFormOptions.none,
  };

  private nameOf = nameOf<NoteFormValues<string | ListItem[] | ImageItem>>();

  state = {
    currentNote: getSelectedNote(
      this.props.history.location.search,
      this.props.notes
    ),
    currentNoteColor:
      getSelectedNote(this.props.history.location.search, this.props.notes)
        ?.color ?? this.defaultNote.color,
  } as TextNoteFormModalState;

  private onSubmitAction = async (
    values: NoteFormValues<string | ListItem[] | ImageItem>
  ): Promise<void> => {
    // eslint-disable-next-line
    const { currentOption, ...note } = values;

    if (this.state.currentNote) {
      const update: UpdateNote = {
        ...this.state.currentNote,
        ...note,
        updatedAt: moment().valueOf(),
      };

      await this.props.updateNote(this.state.currentNote.id, update);
    } else {
      await this.props.addNote(note);
    }

    this.props.history.push(PathNames.base);
  };

  render() {
    return (
      <ContentContainer
        className="note-modal__container"
        style={{
          backgroundColor: this.state.currentNoteColor,
        }}
      >
        <BaseForm<NoteFormValues<string | ListItem[] | ImageItem>>
          initialValues={getInitialNoteFormValues({
            type: this.props.type,
            currentNote: this.state.currentNote,
            defaultValues: this.defaultNote,
          })}
          validate={this.props.validate}
          onSubmit={this.onSubmitAction}
          onCancel={() => this.props.history.push(PathNames.base)}
          submitButtonName={this.state.currentNote ? "Update" : undefined}
          getFormOptions={
            <FormSpy>
              {({
                values,
              }: FormRenderProps<
                NoteFormValues<string | ListItem[] | ImageItem>
              >) => {
                switch (values.currentOption) {
                  case BaseFormOptions.palette:
                    return <ColorsPickerField />;
                  case BaseFormOptions.tags:
                    return <TagsPickerField tags={this.props.tags} />;
                  case BaseFormOptions.collaborators:
                    return (
                      <CollaboratorsField
                        collaborators={this.props.collaborators}
                      />
                    );
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

          {/*content*/}
          {this.props.children}

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
    );
  }
}

const mapStateToProps = (state: Store): StateProps => ({
  notes: state.notes,
  tags: state.tags,
  collaborators: state.collaborators,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  addNote: (note: AddNote) => dispatch(handleAddNote(note)),
  updateNote: (id: string, note: UpdateNote) =>
    dispatch(handleUpdateNote(id, note)),
});

export const NoteForm = connect<StateProps, DispatchProps, any, Store>(
  mapStateToProps,
  mapDispatchToProps
)(NoteFormBase);
