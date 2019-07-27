import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout login">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Keep Me</h1>
      <p>Design by Ilya Suglobov</p>
      <button className="button login__btn" onClick={ startLogin }>Login via Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
