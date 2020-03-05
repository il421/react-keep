import {
  AddTagAction,
  DisplayTagsModalAction,
  RemoveTagAction,
  SetTagsAction,
  TagsActionsTypes,
  TagsStoreState,
  UpdateTagAction
} from "../store/store.types";

const tagsReducerDefaultState: TagsStoreState = {
  list: [],
  displayTagsModal: false
};

type TagsAction =
  | SetTagsAction
  | AddTagAction
  | RemoveTagAction
  | UpdateTagAction
  | DisplayTagsModalAction;

export default (
  state: TagsStoreState = tagsReducerDefaultState,
  action: TagsAction
) => {
  switch (action.type) {
    case TagsActionsTypes.addTag:
      return {
        ...state,
        list: [action.tag, ...state.list]
      };

    case TagsActionsTypes.setTags:
      return action.tags ?? [];

    case TagsActionsTypes.removeTag:
      return {
        ...state,
        list: state.list.filter(tag => tag.id !== action.id)
      };

    case TagsActionsTypes.updateTag:
      return {
        ...state,
        list: state.list.map(tag => {
          if (tag.id === action.id) {
            return {
              ...tag,
              value: action.update
            };
          } else {
            return tag;
          }
        })
      };

    case TagsActionsTypes.displayTagsModal:
      return {
        ...state,
        displayTagsModal: action.displayTagsModal
      };

    default:
      return state;
  }
};
