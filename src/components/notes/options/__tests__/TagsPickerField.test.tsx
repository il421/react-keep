import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TagsPickerField from "../TagsPickerField";
import { tags } from "../../../../testData/tags";
import { Form } from "react-final-form";

test("should render TagsPickerField correctly", () => {
  const wrapper: ReactWrapper = mount(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <TagsPickerField tags={tags} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
