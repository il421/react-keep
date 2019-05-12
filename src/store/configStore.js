import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creating
export default () => {
  const store = createStore(
    combineReducers({
      // add redicers
      auth: authReducer
    }), 
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
