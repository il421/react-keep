import { FormApi } from "final-form";
import { History } from "history";
import React from "react";
import { Field, FormSpy } from "react-final-form";
import Modal from "react-modal";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { updateUserData } from "../../actions/auth";
import {
  AlignItems,
  JustifyContent,
  isModal,
  nameOf,
  Placeholders
} from "../../common";
import { PathNames, QueryKeys } from "../../routers/Routing";
import { AuthStoreState, Store, UpdateUser } from "../../store/store.types";
import "../../styles/components/login/_user-form.scss";
import { BaseForm, TextInputField, FileFormField } from "../form";
import {
  ContentContainer,
  ConfirmButton,
  FlexBox,
  IconButton
} from "../ui-components";

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

export type Props = StateProps & UserFormModalProps & DispatchProps;

export class UserFormModalBase extends React.PureComponent<Props> {
  private nameOf = nameOf<UserFormValues>();
  private readonly NO_AVATAR_URL: string = "img/no_avatar.png";
  private readonly FIELD_ID: string = "avatar";

  private getFormValues = (auth: AuthStoreState): UserFormValues => {
    let firstName: string = "";
    let lastName: string = "";

    if (auth.name !== null) {
      firstName = auth.name.split(" ")[0];
      lastName = auth.name
        .split(" ")
        .filter(i => i !== firstName)
        .join(" ");
    }

    return {
      firstName,
      lastName,
      photoUrl: auth.url
    };
  };

  private getButtons = (isDisable: boolean) => {
    return (
      <>
        <ConfirmButton
          text="Update"
          loading={this.props.auth.loading}
          disabled={isDisable}
          className="login-button user-form__button"
        />

        <ConfirmButton
          text="Close"
          type="button"
          onCLick={this.closeModal}
          className="login-button user-form__button"
        />
      </>
    );
  };

  private onSubmit = (values: UserFormValues) => {
    const displayName = `${values.firstName} ${values.lastName}`.trim();
    this.props.updateUserData({
      displayName: !!displayName ? displayName : null,
      photoFile: values.uploadingPhoto,
      photoURL: values.photoUrl,
      tenantId: this.props.auth.uid
    });
    this.props.history.push(PathNames.base);
  };

  private handleUploadClick = () => {
    const fileInput = document.getElementById(this.FIELD_ID);
    fileInput && fileInput.click();
  };

  private closeModal = () => this.props.history.push(PathNames.base);

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.user
      })
    ) {
      return null;
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={this.closeModal}
        className="user-modal"
        ariaHideApp={false}
      >
        <ContentContainer className="user-modal__container">
          <BaseForm<UserFormValues>
            formClassName="login-box__form user-form"
            initialValues={this.getFormValues(this.props.auth)}
            onSubmit={this.onSubmit}
            getFormActions={this.getButtons}
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
                                : this.NO_AVATAR_URL
                            }
                            width="95"
                            height="95"
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
                            id="test-delete-avatar-button"
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
                          id={this.FIELD_ID}
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
    auth: state.auth
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  updateUserData: (data: UpdateUser) => dispatch(updateUserData(data))
});

export const UserFormModal = connect<
  StateProps,
  DispatchProps,
  UserFormModalProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(UserFormModalBase);
