import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "../reducers/auth";
import notesReducer from "../reducers/notes";
import tagsReducer from "../reducers/tags";
import filtersReducer from "../reducers/filters";
import collaboratorsReducer from "../reducers/collaborators";

// Store Creating
export default () => {
  return createStore(
    combineReducers({
      auth: authReducer,
      notes: notesReducer,
      tags: tagsReducer,
      filters: filtersReducer,
      collaborators: collaboratorsReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
};
