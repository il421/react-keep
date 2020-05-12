import React from "react";
import { connect } from "react-redux";
import { History } from "history";
import Modal from "react-modal";
import { PathNames, QueryKeys } from "../../routers/Routing";
import { AlignItems, JustifyContent } from "../../common/variables";
import { AuthStoreState, Store, UpdateUser } from "../../store/store.types";
import { isModal, nameOf, Placeholders } from "../../common";
import { updateUserData } from "../../actions/auth";
import { ContentContainer, ConfirmButton, FlexBox } from "../ui-components";
import { BaseForm, TextInputField } from "../form";
import "../../styles/components/login/_user-form.scss";
import { ThunkDispatch } from "redux-thunk";
import { IconButton } from "../ui-components/IconButton";
import { Field, FormSpy } from "react-final-form";
import { FileFormField } from "../form/FileFormField";
import { FormApi } from "final-form";

interface UserFormValues {
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  uploadingPhoto?: File;
}

interface StateProps {
  auth: AuthStoreState;
}

interface FormSpyProps {
  form: FormApi;
  values: UserFormValues;
  initialValues: UserFormValues;
}

interface DispatchProps {
  updateUserData: (data: UpdateUser) => void;
}

interface UserFormModalProps {
  history: History;
}

type Props = StateProps & UserFormModalProps & DispatchProps;

class UserFormModal extends React.PureComponent<Props> {
  private nameOf = nameOf<UserFormValues>();

  private getFormValues = (auth: AuthStoreState): UserFormValues => {
    let firstName: string = "";
    let lastName: string = "";

    if (auth.name !== null) {
      firstName = auth.name.split(" ")[0];
      lastName = auth.name
        .split(" ")
        .filter((i) => i !== firstName)
        .join(" ");
    }

    return {
      firstName,
      lastName,
      photoUrl: auth.url,
    };
  };

  private getButtons = (isDisable: boolean) => {
    return (
      <ConfirmButton
        text="Update"
        loading={this.props.auth.loading}
        disabled={isDisable}
        className="user-form__button"
      />
    );
  };

  private onSubmit = (values: UserFormValues) => {
    const displayName = `${values.firstName} ${values.lastName}`.trim();
    this.props.updateUserData({
      displayName: !!displayName ? displayName : null,
      photoFile: values.uploadingPhoto,
      photoURL: values.photoUrl,
    });
    this.props.history.push(PathNames.base);
  };

  private handleUploadClick = () => {
    const fileInput = document.getElementById("file");
    fileInput && fileInput.click();
  };

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.user,
      })
    ) {
      return null;
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.history.push(PathNames.base)}
        closeTimeoutMS={200}
        className="user-modal"
        ariaHideApp={false}
      >
        <ContentContainer>
          <BaseForm<UserFormValues>
            classNames={{
              form: "login-box__form login-form",
            }}
            initialValues={this.getFormValues(this.props.auth)}
            onSubmit={this.onSubmit}
            onCancel={() => this.props.history.push(PathNames.base)}
            getButtons={this.getButtons}
          >
            <FlexBox
              justifyContent={JustifyContent.start}
              alignItems={AlignItems.center}
              className="user-form__avatar avatar"
            >
              <FormSpy>
                {({ form, values, initialValues }: FormSpyProps) => {
                  return (
                    <>
                      <Field name={this.nameOf("photoUrl")}>
                        {() => (
                          <img
                            className="avatar__img"
                            src={
                              values.photoUrl && !values.uploadingPhoto
                                ? values.photoUrl
                                : values.uploadingPhoto
                                ? URL.createObjectURL(values.uploadingPhoto)
                                : "img/no_avatar.png"
                            }
                            width="95"
                            height="95"
                            alt="User photo"
                          />
                        )}
                      </Field>
                      <FlexBox
                        justifyContent={JustifyContent.spaceBetween}
                        alignItems={AlignItems.center}
                        vertical
                      >
                        <IconButton
                          className="avatar__btn"
                          icon="upload"
                          onButtonClick={() => {
                            this.handleUploadClick();
                          }}
                        />
                        <IconButton
                          className="avatar__btn"
                          icon="times"
                          onButtonClick={() => {
                            form.change(
                              this.nameOf("uploadingPhoto"),
                              undefined
                            );
                          }}
                        />
                        {initialValues.photoUrl && (
                          <IconButton
                            className="avatar__btn"
                            icon="trash"
                            onButtonClick={() => {
                              form.change(this.nameOf("photoUrl"), null);
                              form.change(
                                this.nameOf("uploadingPhoto"),
                                undefined
                              );
                            }}
                          />
                        )}
                        <FileFormField
                          id="file"
                          name={this.nameOf("uploadingPhoto")}
                          className="avatar__field"
                        />
                      </FlexBox>
                    </>
                  );
                }}
              </FormSpy>
            </FlexBox>
            <FlexBox
              vertical
              justifyContent={JustifyContent.spaceBetween}
              className="user-form__fields"
            >
              <TextInputField
                name={this.nameOf("firstName")}
                type="text"
                placeholder={Placeholders.firstName}
                className="user-form__field"
                autoFocus={true}
              />

              <TextInputField
                name={this.nameOf("lastName")}
                type="text"
                placeholder={Placeholders.lastName}
                className="user-form__field"
              />
            </FlexBox>
          </BaseForm>
        </ContentContainer>
      </Modal>
    );
  }
}

const mapStateToProps = (state: Store): StateProps => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  updateUserData: (data: UpdateUser) => dispatch(updateUserData(data)),
});

export default connect<StateProps, DispatchProps, UserFormModalProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(UserFormModal);
