import React from 'react';
import Create from './Create';
import NotesList from './NotesList';

const DashboardPage = () => (
  <div>
    <Create className="content-container" />
    <NotesList />
  </div>
);

export default DashboardPage;
