import collaboratorsReducer, {
  collaboratorsReducerDefaultState
} from "../../reducers/collaborators";
import {
  AddCollaboratorAction,
  CollaboratorsActionsTypes,
  CollaboratorsStoreState,
  RemoveCollaboratorAction,
  SetCollaboratorsAction
} from "../../store/store.types";
import { collaborators } from "../../testData/users";

describe("Collaborators reducer", () => {
  test("should set tags", () => {
    const action: SetCollaboratorsAction = {
      type: CollaboratorsActionsTypes.setCollaborators,
      collaborators
    };

    const state = collaboratorsReducer(
      collaboratorsReducerDefaultState,
      action
    ) as CollaboratorsStoreState[];

    expect(state).toBe(action.collaborators);
  });

  test("should add collaborator", () => {
    const action: AddCollaboratorAction = {
      type: CollaboratorsActionsTypes.addCollaborator,
      data: collaborators[0]
    };

    const state = collaboratorsReducer(
      collaboratorsReducerDefaultState,
      action
    ) as CollaboratorsStoreState[];

    expect(state[0]).toBe(collaborators[0]);
  });

  test("should remove collaborator", () => {
    const action: RemoveCollaboratorAction = {
      type: CollaboratorsActionsTypes.removeCollaborator,
      uid: collaborators[0].uid
    };

    const state = collaboratorsReducer(
      collaborators,
      action
    ) as CollaboratorsStoreState[];

    expect(state).toEqual([collaborators[1]]);
  });
});
