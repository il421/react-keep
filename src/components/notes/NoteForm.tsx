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
import {
  AlignItems,
  JustifyContent,
  nameOf,
  PickerColors,
  Placeholders,
} from "../../common";
import { PathNames } from "../../routers/Routing";
import { BaseForm, FieldSpy, TextInputField } from "../form";
import { handleAddNote, handleUpdateNote } from "../../actions/notes";
import { ThunkDispatch } from "redux-thunk";
import moment from "moment";
import {
  getDefaultContent,
  getInitialNoteFormValues,
  getSelectedNote,
} from "./utils";
import {
  ConfirmButton,
  ContentContainer,
  FlexBox,
  IconButton,
  LinkButton,
} from "../ui-components";
import TagsPickerField from "./options/TagsPickerField";
import { ValidationErrors } from "final-form";
import CollaboratorsField from "./options/CollaboratorsField";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../styles/components/notes/_note-form.scss";
import "../../styles/ui-components/_icon-button.scss";
import "../../styles/ui-components/_link-button.scss";

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

// value is an icon name from @fontawesome/react-fontawesome"
// "none" is default or none value
enum NoteFormOptions {
  none = "none",
  palette = "palette",
  tags = "tags",
  collaborators = "share",
}

interface TextNoteFormModalState {
  currentNoteColor: PickerColors;
  currentNote: Note | undefined;
  currentOption: NoteFormOptions | null;
}

export type Props = DispatchProps & StateProps & NoteFormProps;

export class NoteFormBase extends React.PureComponent<Props> {
  private defaultNote: NoteFormValues<string | ListItem[] | ImageItem> = {
    type: this.props.type,
    title: "",
    content: getDefaultContent(this.props.type),
    tags: [],
    color: PickerColors.white,
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
    currentOption: null,
  } as TextNoteFormModalState;

  private onSubmitAction = async (
    values: NoteFormValues<string | ListItem[] | ImageItem>
  ): Promise<void> => {
    // eslint-disable-next-line
    const { ...note } = values;

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

  private handleOnCancel = (): void => {
    this.props.history.push(PathNames.base);
  };

  private setFormOption = (currentOption: NoteFormOptions) => () => {
    this.setState({ currentOption });
  };

  private getFormActions = (isDisable: boolean, isSubmitting: boolean) => {
    return (
      <>
        <FlexBox
          justifyContent={JustifyContent.spaceBetween}
          alignItems={AlignItems.center}
          className="note-form__actions actions"
        >
          <FlexBox
            justifyContent={JustifyContent.start}
            alignItems={AlignItems.baseline}
            className="actions__options"
          >
            {Object.values(NoteFormOptions).map((option: string) =>
              option === NoteFormOptions.none ||
              (option === NoteFormOptions.collaborators &&
                this.state.currentNote &&
                this.state.currentNote.createdBy) ? null : (
                <IconButton
                  key={option}
                  id={`icon-${option}`}
                  icon={option as IconProp}
                  pressed={option === this.state.currentOption}
                  onButtonClick={this.setFormOption(option as NoteFormOptions)}
                />
              )
            )}
          </FlexBox>

          <FlexBox
            justifyContent={JustifyContent.end}
            alignItems={AlignItems.center}
            className="actions__submitting-buttons submitting-buttons"
          >
            <LinkButton
              id="test-base-form-close-button"
              text="Close"
              type="button"
              disabled={isSubmitting}
              onClick={this.handleOnCancel}
            />

            <ConfirmButton
              id="test-base-form-submit-button"
              wrapperClassName="submitting-buttons__submit--width"
              className="link-button"
              text={this.state.currentNote ? "Update" : "Keep"}
              type="submit"
              disabled={isDisable}
              loading={isSubmitting}
            />
          </FlexBox>
        </FlexBox>

        {this.state.currentOption === NoteFormOptions.palette ? (
          <ColorsPickerField />
        ) : this.state.currentOption === NoteFormOptions.tags ? (
          <TagsPickerField tags={this.props.tags} />
        ) : this.state.currentOption === NoteFormOptions.collaborators ? (
          <CollaboratorsField collaborators={this.props.collaborators} />
        ) : null}
      </>
    );
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
          formClassName="note-form"
          initialValues={getInitialNoteFormValues({
            type: this.props.type,
            currentNote: this.state.currentNote,
            defaultValues: this.defaultNote,
          })}
          validate={this.props.validate}
          onSubmit={this.onSubmitAction}
          getFormActions={this.getFormActions}
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
