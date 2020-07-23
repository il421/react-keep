import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Props, CollaboratorsListBase } from "../CollaboratorsList";

import { collaborators } from "../../../testData/users";

let props: Props, wrapper: ReactWrapper<Props>;

beforeEach(() => {
  props = {
    collaborators,
    removeCollaborator: jest.fn(),
  };
  wrapper = mount<Props>(<CollaboratorsListBase {...props} />);
});

test("should render CollaboratorsList", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should call removeCollaborator if click the remove button", () => {
  wrapper.find("button").first().simulate("click");
  expect(props.removeCollaborator).toHaveBeenLastCalledWith(
    collaborators[0].uid
  );
});
