import React from 'react';
import Create from './AddNote';
import NotesList from './NotesList';
// import Footer from './Footer';

const DashboardPage = () => (
  <div className="content-container--flex">
    <Create className="content-container" />
    <NotesList />
  </div>
);

export default DashboardPage;
