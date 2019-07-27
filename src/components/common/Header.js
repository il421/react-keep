import React from 'react';
import { connect } from 'react-redux';

import { startLogout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Search from './Search';

export const Header = ({ startLogout, auth, showSidebar }) => {

  return (
    <header className="header" onClick={(evt) => evt.stopPropagation()}>
      <div className="content-container">
        <div className="header__content">
          <div className="header__sidebar">

            <button className="button button--sidenav" onClick={() => showSidebar()}>
              <FontAwesomeIcon icon="bars" size="2x" />
            </button>

          </div>
          <div>
            <h1 className="header__title">Keep Me</h1>
          </div>
          <div className="header__search">
            <Search />
          </div>
          <div className="header__user-box user-box">
            <div className="user-box__photo">
              <img src={ auth.url } width={ 50 } height={ 50 } />
            </div>
            <div className="user-box__name show-for-mobile">{ auth.name }</div>
            <button className="user-box__logout button button--sidenav" onClick={ startLogout }>
              <FontAwesomeIcon icon="sign-out-alt" size="lg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    url: state.url,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
