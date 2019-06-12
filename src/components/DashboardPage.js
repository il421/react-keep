import React from 'react';
import AddNote from './note/AddNote';
import NotesList from './note/NotesList';

const DashboardPage = () => (
  <div className="content-container--flex">
    <AddNote className="content-container" />
    <NotesList />
  </div>
);

export default DashboardPage;
