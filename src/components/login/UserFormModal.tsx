import React from "react";
import { connect } from "react-redux";
import { History } from "history";
import Modal from "react-modal";
import { PathNames, QueryKeys } from "../../routers/Routing";
import {
  AlignItems,
  JustifyContent,
  isModal,
  nameOf,
  Placeholders,
} from "../../common";
import { AuthStoreState, Store, UpdateUser } from "../../store/store.types";
import { updateUserData } from "../../actions/auth";
import {
  ContentContainer,
  ConfirmButton,
  FlexBox,
  IconButton,
} from "../ui-components";
import { BaseForm, TextInputField, FileFormField } from "../form";
import "../../styles/components/login/_user-form.scss";
import { ThunkDispatch } from "redux-thunk";
import { Field, FormSpy } from "react-final-form";
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

export type Props = StateProps & UserFormModalProps & DispatchProps;

export class UserFormModal extends React.PureComponent<Props> {
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
        className="login-button user-form__button"
      />
    );
  };

  private onSubmit = (values: UserFormValues) => {
    const displayName = `${values.firstName} ${values.lastName}`.trim();
    this.props.updateUserData({
      displayName: !!displayName ? displayName : null,
      photoFile: values.uploadingPhoto,
      photoURL: values.photoUrl,
      tenantId: this.props.auth.uid,
    });
    this.props.history.push(PathNames.base);
  };

  private handleUploadClick = () => {
    const fileInput = document.getElementById(this.FIELD_ID);
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
              form: "login-box__form user-form",
            }}
            initialValues={this.getFormValues(this.props.auth)}
            onSubmit={this.onSubmit}
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
                                : this.NO_AVATAR_URL
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
