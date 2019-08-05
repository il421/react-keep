import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="login-page login">
    <div className="login-page__box">
      <h1 className="login-page__title">Keep Me</h1>
      <p>Design by Ilya Suglobov</p>
      <button className="button login__btn" onClick={ startLogin }>Login via Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
