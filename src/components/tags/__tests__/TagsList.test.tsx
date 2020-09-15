import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Props, TagsListBase } from "../TagsList";
import { tags } from "../../../testData/tags";
import { filters } from "../../../testData/filters";
import { WithFontAwesome } from "../../../common/WithFontAwesome";

let props: Props, wrapper: ReactWrapper<Props>;

beforeEach(() => {
  props = {
    tags: tags,
    filters: filters,
    removeTag: jest.fn(),
    toggleTag: jest.fn(),
    removeTagFromNotes: jest.fn(),
  };
  wrapper = mount<Props>(
    <WithFontAwesome>
      <TagsListBase {...props} />
    </WithFontAwesome>
  );
});

test("should render TagsList", () => {
  expect(wrapper.find("input[id='1-list']").props().checked).toBeTruthy();
  expect(wrapper.find("input[id='2-list']").props().checked).toBeFalsy();
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should call toggleTag if checked", () => {
  wrapper
    .find("input[id='1-list']")
    .simulate("change", { target: { value: false } });
  expect(props.toggleTag).toHaveBeenLastCalledWith(tags[0].id);
});

test("should call removeTag and removeTagFromNotes if click the remove button", () => {
  wrapper.find("button").first().simulate("click");
  expect(props.removeTag).toHaveBeenLastCalledWith(tags[0].id);
  expect(props.removeTagFromNotes).toHaveBeenLastCalledWith(tags[0].id);
});
