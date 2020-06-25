import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Form } from "react-final-form";
import {
  CheckboxGroupField,
  CheckboxGroupFieldProps,
} from "../CheckboxGroupField";

let props: CheckboxGroupFieldProps,
  wrapper: ReactWrapper<CheckboxGroupFieldProps, {}>;

beforeEach(() => {
  props = {
    name: "name",
    options: [
      {
        id: "id1",
        value: "1",
      },
      {
        id: "id2",
        value: "2",
      },
    ],
  };
});

test("should render CheckboxGroupField, and contain input element", () => {
  wrapper = mount<CheckboxGroupFieldProps>(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <CheckboxGroupField {...props} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
  expect(wrapper.find("#id1").exists()).toBeTruthy();
  expect(wrapper.find("label[htmlFor='id1']").exists()).toBeTruthy();
  expect(wrapper.find("#id2").exists()).toBeTruthy();
  expect(wrapper.find("label[htmlFor='id2']").exists()).toBeTruthy();
});
