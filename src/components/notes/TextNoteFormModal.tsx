import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {BaseForm} from "../form/BaseForm";
import {Note} from "../../store/store.types";
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

interface TextNoteFormValues extends Omit<Note, "id" | "important" | "createdAt" | "updatedAt"> {
  currentOption: BaseFormOptions
}
interface TextNoteFormModalProps extends RouteComponentProps{}

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
  };

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
            onSubmit={(values) => console.log(values)}
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
                (value) => {
                  if (this.state.currentNoteColor !== value) {
                    this.setState({currentNoteColor: value})
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

export default withRouter(TextNoteFormModal);
