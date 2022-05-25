import { mount, ReactWrapper } from "enzyme";
import React from "react";

import { CheckboxGroup, CheckboxGroupProps } from "../CheckboxGroup";

let props: CheckboxGroupProps, wrapper: ReactWrapper<CheckboxGroupProps, {}>;

beforeEach(() => {
  props = {
    selectedKeys: ["id1"],
    options: [
      {
        id: "id1",
        value: "1"
      },
      {
        id: "id2",
        value: "2"
      }
    ],
    onChange: jest.fn()
  };
  wrapper = mount<CheckboxGroupProps>(<CheckboxGroup {...props} />);
});

test("should render CheckboxGroup, and contain input element", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should select options correctly", () => {
  wrapper
    .find("#id2")
    .hostNodes()
    .simulate("change", { target: { value: true } });
  wrapper.find("label[htmlFor='id2']").hostNodes().simulate("click");
  expect(props.onChange).toHaveBeenLastCalledWith(["id1", "id2"]);
});
