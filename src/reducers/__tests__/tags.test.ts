import tagsReducer, { tagsReducerDefaultState } from "../../reducers/tags";
import {
  AddTagAction,
  RemoveTagAction,
  SetTagsAction,
  TagsActionsTypes,
  TagsStoreState
} from "../../store/store.types";
import { tags } from "../../testData/tags";

describe("Tags reducer", () => {
  test("should set tags", () => {
    const action: SetTagsAction = {
      type: TagsActionsTypes.setTags,
      tags
    };

    const state = tagsReducer(
      tagsReducerDefaultState,
      action
    ) as TagsStoreState[];

    expect(state).toBe(action.tags);
  });

  test("should add tag", () => {
    const action: AddTagAction = {
      type: TagsActionsTypes.addTag,
      tag: tags[0]
    };

    const state = tagsReducer(
      tagsReducerDefaultState,
      action
    ) as TagsStoreState[];

    expect(state[0]).toBe(tags[0]);
  });

  test("should remove tag", () => {
    const action: RemoveTagAction = {
      type: TagsActionsTypes.removeTag,
      id: tags[0].id
    };

    const state = tagsReducer(tags, action) as TagsStoreState[];

    expect(state).toEqual([tags[1]]);
  });
});
