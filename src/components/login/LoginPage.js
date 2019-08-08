import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login = [
    {
      id: 'email',
      type: 'email',
      placeholder: 'E-mail',
      inputmode: 'email'
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      inputmode: 'text'
    }
  ];

  errors = {
    email: '',
    password: '',
  };

  handleInputChange = (id, evt) => {
    const VALID_EMAIL_REGEX =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const value = evt.target.value.trim();

    switch (id) {
    case 'email':
      this.errors.email =
          VALID_EMAIL_REGEX.test(value)
            ? ''
            : 'Email is not valid!';
      break;
    case 'password':
      this.errors.password =
            value.length < 8
              ? 'Password must be 8 characters long!'
              : '';
      break;
    default:
      break;
    }

    this.setState(() => ({
      [id]: value,
    }));
  }

  onLoginUser = () => {
    const hasErrors = this.errors.email.length === 0 && this.errors.password.length === 0;
    const emptyValues = this.state.email.length === 0 && this.state.password.length === 0;

    if(hasErrors && !emptyValues) {
      console.log('valid');
    } else {
      // @todo toast
      console.log('not');
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-page__login-box login-box">
          <div className="login-box__desc">
            <h1>Keep Me</h1>
            <p>Design by Ilya Suglobov</p>
          </div>

          <div className="login-box__form">
            {
              this.login.map((input, index) => (
                <div key={ index }>
                  <input
                    id={ input.id }
                    type={ input.type }
                    placeholder={ input.placeholder }
                    inputMode={ input.inputmode }
                    defaultValue={ this.state[input.id] }
                    onInput={ (evt) => this.handleInputChange(input.id, evt) }
                  />
                  <span>{ this.errors[input.id] }</span>
                </div>
              ))
            }
            <button className="button" onClick={ this.onLoginUser }>Log In</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
