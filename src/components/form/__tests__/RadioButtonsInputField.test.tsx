import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  RadioButtonsInputField,
  RadioButtonsInputFieldProps,
} from "../RadioButtonsInputField";
import { Form } from "react-final-form";

let props: RadioButtonsInputFieldProps,
  wrapper: ReactWrapper<RadioButtonsInputFieldProps, {}>;

beforeEach(() => {
  props = {
    name: "name",
    id: "id",
    radioClassName: "radioClassName",
  };
});

test("should render RadioButtonsInputField, and contain input element", () => {
  wrapper = mount<RadioButtonsInputFieldProps>(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <RadioButtonsInputField {...props} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
  expect(wrapper.find("#id").exists()).toBeTruthy();
  expect(wrapper.find("label[htmlFor='id']").exists()).toBeTruthy();
});
