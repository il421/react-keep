import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Form } from "react-final-form";

import { collaborators } from "../../../../testData/users";
import CollaboratorsField from "../CollaboratorsField";

test("should render CollaboratorsField correctly", () => {
  const wrapper: ReactWrapper = mount(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <CollaboratorsField collaborators={collaborators} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
