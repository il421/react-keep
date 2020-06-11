/* eslint-disable indent */
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  AddNote,
  ImageItem,
  ListItem,
  Note,
  NotesStoreState,
  Store,
  TagsStoreState,
  UpdateNote,
} from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { PickerColors } from "../../common/variables";
import ColorsPickerField from "./options/ColorsPickerField";
import { nameOf, Placeholders } from "../../common";
import { PathNames } from "../../routers/Routing";
import {
  BaseForm,
  BaseFormOptions,
  FieldSpy,
  TextInputField,
} from "../form/index";
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
import { ContentContainer } from "../ui-components/ContentContainer";
import TagsPickerField from "./options/TagsPickerField";

interface StateProps {
  notes: NotesStoreState[];
  tags: TagsStoreState[];
}

interface NoteFormProps {
  type: NoteType;
}

interface DispatchProps {
  addNote: (note: AddNote) => void;
  updateNote: (id: string, note: UpdateNote) => void;
}

interface TextNoteFormModalState {
  currentNoteColor: PickerColors;
  currentNote: Note | null;
}

type Props = RouteComponentProps & DispatchProps & StateProps & NoteFormProps;

class NoteForm extends React.Component<Props> {
  private defaultNote: NoteFormValues<string | ListItem[] | ImageItem> = {
    type: this.props.type,
    title: "",
    content: getDefaultContent(this.props.type),
    tags: [],
    color: PickerColors.white,
    currentOption: BaseFormOptions.none,
  };

  private nameOf = nameOf<NoteFormValues<string | ListItem[]>>();

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
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  addNote: (note: AddNote) => dispatch(handleAddNote(note)),
  updateNote: (id: string, note: UpdateNote) =>
    dispatch(handleUpdateNote(id, note)),
});

export default withRouter(
  connect<StateProps, DispatchProps, RouteComponentProps, Store>(
    mapStateToProps,
    mapDispatchToProps
  )(NoteForm)
);
