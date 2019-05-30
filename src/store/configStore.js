import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import notesReducer from '../reducers/notes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creating
export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      notes: notesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
