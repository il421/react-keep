import {
  AddTagAction,
  RemoveTagAction,
  SetTagsAction,
  TagsActionsTypes,
  TagsStoreState,
  UpdateTagAction
} from "../store/store.types";

const tagsReducerDefaultState: TagsStoreState[] = [];

type TagsAction =
  | SetTagsAction
  | AddTagAction
  | RemoveTagAction
  | UpdateTagAction;

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
      return state.filter(tag => tag.id !== action.id);

    case TagsActionsTypes.updateTag:
      return state.map(tag => {
        if (tag.id === action.id) {
          return {
            ...tag,
            ...action.update
          };
        } else {
          return tag;
        }
      });

    default:
      return state;
  }
};
