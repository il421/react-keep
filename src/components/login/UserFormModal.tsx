import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { AlignItems, JustifyContent, nameOf, Placeholders } from "../../common";
import { AuthStoreState, Store, UpdateUser } from "../../store/store.types";
import { toggleUserModal, updateUserData } from "../../actions/auth";
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
  toggleUserModal: (isUserModalOpen: boolean) => void;
}

interface UserFormModalProps {}

export type Props = StateProps & UserFormModalProps & DispatchProps;

export const UserFormModal: React.FunctionComponent<Props> = ({
  updateUserData,
  toggleUserModal,
  auth,
}) => {
  const nameOfField = nameOf<UserFormValues>();
  const NO_AVATAR_URL: string = "img/no_avatar.png";
  const FIELD_ID: string = "avatar";

  const getFormValues = (): UserFormValues => {
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

  const onToggleAction = (isUserModalOpen: boolean) => () =>
    toggleUserModal(isUserModalOpen);

  const getButtons = (isDisable: boolean) => {
    return (
      <>
        <ConfirmButton
          text="Update"
          loading={auth.loading}
          disabled={isDisable}
          className="login-button user-form__button"
        />

        <ConfirmButton
          text="Close"
          type="button"
          onClick={onToggleAction(false)}
          className="login-button user-form__button"
        />
      </>
    );
  };

  const onSubmit = (values: UserFormValues) => {
    const displayName = `${values.firstName} ${values.lastName}`.trim();
    updateUserData({
      displayName: !!displayName ? displayName : null,
      photoFile: values.uploadingPhoto,
      photoURL: values.photoUrl,
      tenantId: auth.uid,
    });
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById(FIELD_ID);
    fileInput && fileInput.click();
  };

  return (
    <Modal
      isOpen={auth.isUserModalOpen}
      onRequestClose={onToggleAction(false)}
      className="user-modal"
      ariaHideApp={false}
    >
      <ContentContainer className="user-modal__container">
        <BaseForm<UserFormValues>
          formClassName="login-box__form user-form"
          initialValues={getFormValues()}
          onSubmit={onSubmit}
          getFormActions={getButtons}
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
                    <Field name={nameOfField("photoUrl")}>
                      {() => (
                        <img
                          className="avatar__img"
                          src={
                            values.photoUrl && !values.uploadingPhoto
                              ? values.photoUrl
                              : values.uploadingPhoto
                              ? URL.createObjectURL(values.uploadingPhoto)
                              : NO_AVATAR_URL
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
                          handleUploadClick();
                        }}
                      />
                      <IconButton
                        className="avatar__btn"
                        icon="times"
                        onButtonClick={() => {
                          form.change(nameOfField("uploadingPhoto"), undefined);
                        }}
                      />
                      {initialValues.photoUrl && (
                        <IconButton
                          id="test-delete-avatar-button"
                          className="avatar__btn"
                          icon="trash"
                          onButtonClick={() => {
                            form.change(nameOfField("photoUrl"), null);
                            form.change(
                              nameOfField("uploadingPhoto"),
                              undefined
                            );
                          }}
                        />
                      )}
                      <FileFormField
                        id={FIELD_ID}
                        name={nameOfField("uploadingPhoto")}
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
              name={nameOfField("firstName")}
              type="text"
              placeholder={Placeholders.firstName}
              className="user-form__field"
            />

            <TextInputField
              name={nameOfField("lastName")}
              type="text"
              placeholder={Placeholders.lastName}
              className="user-form__field"
            />
          </FlexBox>
        </BaseForm>
      </ContentContainer>
    </Modal>
  );
};

const mapStateToProps = (state: Store): StateProps => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  updateUserData: (data: UpdateUser) => dispatch(updateUserData(data)),
  toggleUserModal: (isUserModalOpen: boolean) =>
    dispatch(toggleUserModal(isUserModalOpen)),
});

export default connect<StateProps, DispatchProps, UserFormModalProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(UserFormModal);
