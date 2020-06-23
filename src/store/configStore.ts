import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "../reducers/auth";
import notesReducer from "../reducers/notes";
import tagsReducer from "../reducers/tags";
import filtersReducer from "../reducers/filters";

// Store Creating
export default () => {
  return createStore(
    combineReducers({
      auth: authReducer,
      notes: notesReducer,
      tags: tagsReducer,
      filters: filtersReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
};
