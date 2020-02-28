import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { startLogin, startSignUp } from "../../actions/auth";
import { Store } from "../../store/store.types";
import { LoginButton } from "../ui-components/LoginButton";
import { nameOf, Errors, emailRegEx, Placeholders} from "../../common";
import "../../styles/components/login/_login-page.scss";
import { ValidationErrors } from "final-form";
import { BaseForm, CheckboxInputField, TextInputField } from "../form";
import {ToastContainer} from "react-toastify";

interface LoginPageProps {
  startLogin: (email: string, password: string) => void;
  startSignUp: (email: string, password: string) => void;
  loading: boolean;
}

interface LoginFormValues {
  email: string;
  password: string;
  isNew: boolean;
}

export class LoginPage extends React.PureComponent<LoginPageProps> {
  private initialValues: LoginFormValues = {
    email: "",
    password: "",
    isNew: false
  };

  private nameOf = nameOf<LoginFormValues>();

  private getButtons = (isDisable: boolean, isSubmitting: boolean, values: LoginFormValues) => {
    return (
      <LoginButton
        text={values.isNew ? "Sign Up" : "Log In"}
        loading={this.props.loading}
        disabled={isDisable}
      />
    );
  };

  private getValidationErrors = (values: LoginFormValues): ValidationErrors => {
    const errors: ValidationErrors = {};
    const { email, password } = values;

    if (!password) {
      errors.password = Errors.required;
    } else if (password.length < 6) {
      errors.password = Errors.password;
    }

    if (!email) {
      errors.email = Errors.required;
    } else if (!emailRegEx.test(email)) {
      errors.email = Errors.email;
    }

    return errors;
  };

  private submitLoginForm = (values: LoginFormValues): void => {
    if (values.isNew) {
      this.props.startSignUp(values.email, values.password);
    } else {
      this.props.startLogin(values.email, values.password);
    }
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-page__login-box login-box">
          <div className="login-box__desc">
            <h1>Keep Me</h1>
            <p>Design by Ilya Suglobov</p>
          </div>

          <BaseForm<LoginFormValues>
            initialValues={this.initialValues}
            classNames={{
              form: "login-box__form login-form\""
            }}
            onSubmit={this.submitLoginForm}
            validate={this.getValidationErrors}
            getButtons={this.getButtons}
          >
            <TextInputField
              name={this.nameOf("email")}
              type="text"
              placeholder={ Placeholders.email }
              className="login-form__field"
            />

            <TextInputField
              name={this.nameOf("password")}
              type="password"
              placeholder={ Placeholders.password }
              className="login-form__field"
            />

            <div className="login-form__new-user-field new-user-field">
              <CheckboxInputField
                name={this.nameOf("isNew")}
                className="new-user-field__checkbox"
              />
              <div>I want to sign up as a new user</div>
            </div>
          </BaseForm>
        </div>
        <ToastContainer autoClose={ 3000 } />
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  startLogin: (email: string, password: string) => dispatch(startLogin(email, password)),
  startSignUp: (email: string, password: string) => dispatch(startSignUp(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
