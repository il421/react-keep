import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import SideNav from 'react-simple-sidenav';

export const Header = ({ startLogout, auth }) => {
  let [ showNav, onSetSidebarOpen ] = useState(false);
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
  }

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <div className="header__sidebar sidebar">
            <button className="button--sidenav" onClick={() => onSetSidebarOpen(showNav = true)}>
              <FontAwesomeIcon icon={ faBars } size="2x" />
            </button>
            <SideNav
              showNav={ showNav }
              onHideNav={() => onSetSidebarOpen(showNav = false)}
              navStyle={ sidenavStyles.nav }
              titleStyle={ sidenavStyles.title }
              items={[]}
              title={
                <button className="button--sidenav" onClick={() => onSetSidebarOpen(showNav = false)}>
                  <FontAwesomeIcon icon={ faTimes } size="1x" />
                </button>
              }
            />
          </div>
          <Link to="/dashboard">
            <h1 className="header__title">Keep Me</h1>
          </Link>
          <div className="header__user-box user-box">
            <div className="user-box__photo">
              <img src={auth.url} width={35} height={35} />
            </div>
            <div className="user-box__name show-for-mobile">{ auth.name }</div>
            <button className="button button--link" onClick={ startLogout }>
              <FontAwesomeIcon icon={ faSignOutAlt } size="1x" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    url: state.url,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
