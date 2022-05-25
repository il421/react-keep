import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Form } from "react-final-form";

import { tags } from "../../../../testData/tags";
import TagsPickerField from "../TagsPickerField";

test("should render TagsPickerField correctly", () => {
  const wrapper: ReactWrapper = mount(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <TagsPickerField tags={tags} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
