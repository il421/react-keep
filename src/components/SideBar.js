import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tags from './tags/Tags';

export const SideBar = ({ hideSidebar, showBar }) => {
  return (
    <>
      <div className={ `sidebar ${showBar && 'sidebar--show'}` }>
        <div className="sidebar__close">
          <button className="button--sidenav" onClick={() => hideSidebar()}>
            <FontAwesomeIcon icon="times" size="3x"/>
          </button>
        </div>

        <Tags hideSidebar={() => hideSidebar()} />
      </div>

      {
        showBar && <div className="sidebar__cover" onClick={ () => hideSidebar() } />
      }
    </>
  );
};

export  default SideBar;
