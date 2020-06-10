import {
  AddTagAction,
  RemoveTagAction,
  SetTagsAction,
  TagsActionsTypes,
  TagsStoreState,
} from "../store/store.types";

export const tagsReducerDefaultState: TagsStoreState[] = [];

type TagsAction = SetTagsAction | AddTagAction | RemoveTagAction;

export default (
  state: TagsStoreState[] = tagsReducerDefaultState,
  action: TagsAction
) => {
  switch (action.type) {
    case TagsActionsTypes.addTag:
      return [action.tag, ...state];

    case TagsActionsTypes.setTags:
      return action.tags ?? [];

    case TagsActionsTypes.removeTag:
      return state.filter((tag) => tag.id !== action.id);

    default:
      return state;
  }
};
