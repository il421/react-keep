import React from 'react';
import AddNote from './AddNote';
import NotesList from './NotesList';
// import Footer from './Footer';

const DashboardPage = () => (
  <div className="content-container--flex">
    <AddNote className="content-container" />
    <NotesList />
  </div>
);

export default DashboardPage;
