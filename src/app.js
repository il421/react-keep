import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configStore from './store/configStore';
import { login, logout } from './actions/auth';

import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configStore();

const jsx = ( // Provider - Now we can use store everywhere
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// google authification
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid, user.displayName));

    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }

  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
