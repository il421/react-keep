import React from "react";
import { mount, ReactWrapper } from "enzyme";
import CollaboratorsField from "../CollaboratorsField";
import { Form } from "react-final-form";
import { collaborators } from "../../../../testData/users";

test("should render CollaboratorsField correctly", () => {
  const wrapper: ReactWrapper = mount(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <CollaboratorsField collaborators={collaborators} />}
    </Form>
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
