import React from "react";
import {
  AuthStoreState,
  CollaboratorsStoreState,
  Store,
  UserData,
} from "../../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { TextInputField, BaseForm } from "../form";
import { Placeholders, nameOf, Errors, emailRegEx } from "../../common";
import "../../styles/components/collaborators/_collaborators-form.scss";
import { IconButton } from "../ui-components";
import { ValidationErrors } from "final-form";
import { handleAddCollaborator } from "../../actions/collaborators";
import { getUserByEmail } from "../../libs/functions";

interface TagFormProps {}

interface StateProps {
  collaborators: CollaboratorsStoreState[];
  auth: AuthStoreState;
}

interface DispatchProps {
  addCollaborator: (data: UserData) => void;
}
export type Props = TagFormProps & DispatchProps & StateProps;

interface CollaboratorFormValues {
  email: string | undefined;
}

export const getValidationErrors = (
  userEmail: string,
  existingEmails: string[]
) => (values: CollaboratorFormValues): ValidationErrors => {
  const errors: ValidationErrors = {};
  const { email } = values;

  if (typeof email === "undefined" || email.length === 0) {
    errors.email = Errors.required;
  } else if (email && !emailRegEx.test(email.trim())) {
    errors.email = Errors.email;
  } else if (email && email.trim() === userEmail) {
    errors.email = Errors.currentEmail;
  } else if (email && existingEmails.includes(email)) {
    errors.email = Errors.existingCollaborator;
  }
  return errors;
};

export class CollaboratorForm extends React.PureComponent<Props> {
  private nameOf = nameOf<CollaboratorFormValues>();

  private getUserDataByEmail = async (values: CollaboratorFormValues) => {
    await getUserByEmail(values.email!, this.props.addCollaborator);
  };

  render() {
    return (
      <BaseForm<CollaboratorFormValues>
        initialValues={{ email: undefined }}
        onSubmit={this.getUserDataByEmail}
        onCancel={() => {}}
        classNames={{
          form: "collaborators-form",
        }}
        validate={getValidationErrors(
          this.props.auth.email!,
          this.props.collaborators.map((c) => c.email!)
        )}
        resetAfterSubmitting={true}
        getButtons={(isDisable: boolean) => (
          <IconButton
            className="collaborators-form__submit"
            icon="plus-circle"
            size="1x"
            type="submit"
            disabled={isDisable}
          />
        )}
      >
        <TextInputField
          name={this.nameOf("email")}
          type="text"
          placeholder={Placeholders.email}
          className="collaborators-form__field"
          autoFocus={true}
        />
      </BaseForm>
    );
  }
}

const mapStateToProps = (state: Store): StateProps => {
  return {
    collaborators: state.collaborators,
    auth: state.auth,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  addCollaborator: (data: UserData) => dispatch(handleAddCollaborator(data)),
});

export default connect<StateProps, DispatchProps, TagFormProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(CollaboratorForm);
