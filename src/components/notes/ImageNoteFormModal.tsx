import React from "react";
import Modal from "react-modal";
import { NoteFormValues, NoteType } from "./notes.types";
import { isModal, nameOf, Placeholders } from "../../common";
import { PathNames, QueryKeys } from "../../routers/Routing";
import { FileFormField, TextInputField } from "../form/index";
import "../../styles/components/notes/_note-form.scss";
import "../../styles/components/notes/_image-note-form-item.scss";
import NoteForm from "./NoteForm";
import { History } from "history";
import { ImageItem } from "../../store/store.types";
import { Field, FormRenderProps, FormSpy } from "react-final-form";
import { AlignItems, JustifyContent } from "../../common/variables";
import { IconButton } from "../ui-components/IconButton";
import { FlexBox } from "../ui-components/FlexBox";

interface ImageNoteFormModalProps {
  history: History;
}

class ImageNoteFormModal extends React.Component<ImageNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<ImageItem>>();
  private nameOfContent = nameOf<ImageItem>();
  private readonly NO_IMAGE_URL: string = "img/no_image.png";
  private readonly FIELD_ID: string = "image";

  private handleUploadClick = () => {
    const fileInput = document.getElementById(this.FIELD_ID);
    fileInput && fileInput.click();
  };

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.image,
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
        <NoteForm type={NoteType.image}>
          <FormSpy>
            {({
              form,
              values,
              initialValues,
            }: FormRenderProps<NoteFormValues<ImageItem>>) => {
              return (
                <div className="image-note-form-item">
                  <Field
                    name={`${this.nameOf("content")}[${this.nameOfContent(
                      "imageUrl"
                    )}]`}
                  >
                    {() => (
                      <img
                        className="image-note-form-item__img"
                        src={
                          values.content.imageUrl &&
                          !values.content.uploadingImage
                            ? values.content.imageUrl
                            : values.content.uploadingImage
                            ? URL.createObjectURL(values.content.uploadingImage)
                            : this.NO_IMAGE_URL
                        }
                        alt="Uploaded file"
                      />
                    )}
                  </Field>
                  <FlexBox
                    className="image-note-form-item__btns"
                    justifyContent={JustifyContent.spaceBetween}
                    alignItems={AlignItems.center}
                    vertical
                  >
                    <IconButton
                      icon="upload"
                      onButtonClick={() => {
                        this.handleUploadClick();
                      }}
                    />
                    <IconButton
                      icon="times"
                      onButtonClick={() => {
                        form.change(
                          `${this.nameOf("content")}[${this.nameOfContent(
                            "uploadingImage"
                          )}]`,
                          undefined
                        );
                      }}
                    />
                    {initialValues.content.imageUrl && (
                      <IconButton
                        icon="trash"
                        onButtonClick={() => {
                          form.change(
                            `${this.nameOf("content")}[${this.nameOfContent(
                              "imageUrl"
                            )}]`,
                            null
                          );
                          form.change(
                            `${this.nameOf("content")}[${this.nameOfContent(
                              "uploadingImage"
                            )}]`,
                            undefined
                          );
                        }}
                      />
                    )}
                    <FileFormField
                      id={this.FIELD_ID}
                      name={`${this.nameOf("content")}[${this.nameOfContent(
                        "uploadingImage"
                      )}]`}
                      className="image-note-form-item__field"
                    />
                  </FlexBox>
                </div>
              );
            }}
          </FormSpy>

          <TextInputField
            isTextArea={true}
            name={`${this.nameOf("content")}[${this.nameOfContent("content")}]`}
            placeholder={Placeholders.content}
            className="note-form__text"
          />
        </NoteForm>
      </Modal>
    );
  }
}

export default ImageNoteFormModal;