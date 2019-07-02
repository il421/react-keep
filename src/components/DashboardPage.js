import React, { useState } from 'react';

import AddNote from './note/AddNote';
import NotesList from './note/NotesList';
import Header from './Header';
import SideBar from './SideBar';


const DashboardPage = () => {
  let [showBar, toggleSidebarDisplay] = useState(false);

  const showSidebar = () => {
    toggleSidebarDisplay(showBar = true);
  };

  const hideSidebar = () => {
    toggleSidebarDisplay(showBar = false);
  };

  return (
    <div className="dashboard">
      <Header showSidebar={ showSidebar } />
      <AddNote className="content-container"/>
      <NotesList/>

      <SideBar showBar={ showBar } hideSidebar={ hideSidebar } />
    </div>
  );
};
export default DashboardPage;
