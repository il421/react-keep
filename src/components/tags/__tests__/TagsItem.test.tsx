import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TagsItem, { TagsItemProps } from "../TagsItem";
import { tags } from "../../../testData/tags";
import { WithFontAwesome } from "../../../common/WithFontAwesome";

let props: TagsItemProps, wrapper: ReactWrapper<TagsItemProps>;

beforeEach(() => {
  props = {
    tag: tags[0],
    removeTag: jest.fn(),
    checked: true,
    onChange: jest.fn(),
  };
  wrapper = mount<TagsItemProps>(
    <WithFontAwesome>
      <TagsItem {...props} />
    </WithFontAwesome>
  );
});

test("should render TagsItem", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should call onChange if checked", () => {
  wrapper
    .find("input[id='1-list']")
    .simulate("change", { target: { value: false } });
  expect(props.onChange).toHaveBeenLastCalledWith(tags[0].id);
});

test("should call removeTag if click the remove button", () => {
  wrapper.find("button").simulate("click");
  expect(props.removeTag).toHaveBeenLastCalledWith(tags[0].id);
});
