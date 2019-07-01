import React, { useState } from 'react';
import { connect } from 'react-redux';
import SideBar from 'react-simple-sidenav';

import { startLogout } from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Search from './Search';
import Tags from './tags/Tags';

export const Header = ({ startLogout, auth }) => {
  let [ showNav, toggleSidebarDisplay ] = useState(false);
  const sidenavStyles = {
    title: {
      backgroundColor: '#4abdac',
      padding: '0 3rem 0 0',
      textAlign: 'right',
    },
    nav: {
      backgroundColor: '#4abdac',
      width: '300px'
    }
  };

  const showSidebar = () => {
    toggleSidebarDisplay(showNav = true);
  }

  const hideSidebar = () => {
    toggleSidebarDisplay(showNav = false);
  }

  return (
    <header className="header" onClick={(evt) => evt.stopPropagation()}>
      <div className="content-container">
        <div className="header__content">
          <div className="header__sidebar sidebar">

            <button className="button--sidenav" onClick={() => showSidebar()}>
              <FontAwesomeIcon icon="bars" size="3x" />
            </button>

            <SideBar
              showNav={ showNav }
              navStyle={ sidenavStyles.nav }
              titleStyle={ sidenavStyles.title }
            >
              <div className="sidebar">
                <div className="sidebar__close">
                  <button className="button--sidenav" onClick={() => hideSidebar()}>
                    <FontAwesomeIcon icon="times" size="3x" />
                  </button>
                </div>

                <Tags hideSidebar={() => hideSidebar()} />
              </div>
            </SideBar>

          </div>
          <div>
            <h1 className="header__title">Keep Me</h1>
          </div>
          <div className="header__search">
            <Search />
          </div>
          <div className="header__user-box user-box">
            <div className="user-box__photo">
              <img src={auth.url} width={50} height={50} />
            </div>
            <div className="user-box__name show-for-mobile">{ auth.name }</div>
            <button className="button button--sidenav" onClick={ startLogout }>
              <FontAwesomeIcon icon="sign-out-alt" size="1x" />
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
