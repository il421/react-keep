import {
  AddCollaboratorAction,
  CollaboratorsActionsTypes,
  CollaboratorsStoreState,
  RemoveCollaboratorAction,
  SetCollaboratorsAction
} from "../store/store.types";

export const collaboratorsReducerDefaultState: CollaboratorsStoreState[] = [];

type CollaboratorsAction =
  | SetCollaboratorsAction
  | AddCollaboratorAction
  | RemoveCollaboratorAction;

export const collaboratorsReducer = (
  state: CollaboratorsStoreState[] = collaboratorsReducerDefaultState,
  action: CollaboratorsAction
) => {
  switch (action.type) {
    case CollaboratorsActionsTypes.addCollaborator:
      return [action.data, ...state];

    case CollaboratorsActionsTypes.setCollaborators:
      return action.collaborators ?? [];

    case CollaboratorsActionsTypes.removeCollaborator:
      return state.filter(coll => coll.uid !== action.uid);

    default:
      return state;
  }
};
