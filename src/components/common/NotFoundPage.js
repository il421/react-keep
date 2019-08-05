import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found__wrapper">
      <div className="not-found__text">
        Sorry, such a page does not exist in the App. <br /><br />
        Try to find something interesting on the Dashboard page.
      </div>
      <Link to="/" className="not-found__link button">Keep me ...</Link>
    </div>
  </div>
);

export default NotFoundPage;
