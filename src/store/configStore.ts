import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  notesReducer,
  tagsReducer,
  filtersReducer,
  authReducer,
  collaboratorsReducer
} from "../reducers";

// Store Creating
export const configStore = () => {
  return createStore(
    combineReducers({
      auth: authReducer,
      notes: notesReducer,
      tags: tagsReducer,
      filters: filtersReducer,
      collaborators: collaboratorsReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
};
