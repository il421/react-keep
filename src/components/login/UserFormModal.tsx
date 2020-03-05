import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { History } from "history";
import Modal from "react-modal";
import { PathNames, QueryKeys } from "../../routers/Routing";
import { JustifyContent } from "../../common/variables";
import { AuthStoreState, Store, UpdateUser } from "../../store/store.types";
import { isModal, nameOf, Placeholders } from "../../common";
import { updateUserData } from "../../actions/auth";
import { ContentContainer, ConfirmButton, FlexBox } from "../ui-components";
import { BaseForm, TextInputField, FileFormField } from "../form";
import "../../styles/components/login/_user-form.scss";

interface UserFormValues {
  firstName: string,
  lastName: string,
  url: any
}

interface UserFormModalProps {
  auth: AuthStoreState
  updateUserData: (data: UpdateUser) => void;
  history: History
}

class UserFormModal extends React.PureComponent<UserFormModalProps> {
  private nameOf = nameOf<UserFormValues>();

  private getFormValues = (auth: AuthStoreState): UserFormValues => {
    let firstName: string = "";
    let lastName: string = "";

    if (auth.name !== null) {
      firstName = auth.name.split(" ")[0];
      lastName = auth.name.split(" ").filter(i => i !== firstName).join(" ");
    }

    return {
      firstName,
      lastName,
      url: auth.url
    };
  };

  private getButtons = (isDisable: boolean) => {
    return (
      <ConfirmButton
        text="Update"
        loading={ this.props.auth.loading }
        disabled={ isDisable }
        className="user-form__button"
      />
    );
  };

  private onSubmit = (values: UserFormValues) => {
    const displayName = `${values.firstName} ${values.lastName}`.trim();
    this.props.updateUserData({
      displayName: !!displayName ? displayName : null,
      photoURL: values.url,
    });
  };

  render() {
    return (
      <Modal
        isOpen={ isModal({ query: this.props.history.location.search, type: QueryKeys.user }) }
        onRequestClose={ () => this.props.history.push(PathNames.base) }
        closeTimeoutMS={ 200 }
        className="user-modal"
        ariaHideApp={ false }
      >
        <ContentContainer>
          <BaseForm<UserFormValues>
            classNames={{
              form: "login-box__form login-form"
            }}
            initialValues={this.getFormValues(this.props.auth)}
            onSubmit={this.onSubmit}
            onCancel={() => this.props.history.push(PathNames.base)}
            getButtons={this.getButtons}
          >
            {/*// @TODO change to a component*/}
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "green" }} />

            <FileFormField name={this.nameOf("url")} className="user-form__avatar" />
            <FlexBox vertical justifyContent={JustifyContent.spaceBetween} className="user-form__fields">
              <TextInputField
                name={this.nameOf("firstName")}
                type="text"
                placeholder={ Placeholders.firstName }
                className="user-form__field"
                autoFocus={true}
              />

              <TextInputField
                name={this.nameOf("lastName")}
                type="text"
                placeholder={ Placeholders.lastName }
                className="user-form__field"
              />
            </FlexBox>

          </BaseForm>
        </ContentContainer>
      </Modal>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateUserData: (data: UpdateUser) => dispatch(updateUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFormModal);
