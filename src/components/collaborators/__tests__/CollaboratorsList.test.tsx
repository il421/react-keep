import { mount, ReactWrapper } from "enzyme";
import React from "react";

import { WithFontAwesome } from "../../../common/WithFontAwesome";
import { collaborators } from "../../../testData/users";
import { Props, CollaboratorsListBase } from "../CollaboratorsList";

let props: Props, wrapper: ReactWrapper<Props>;

beforeEach(() => {
  props = {
    collaborators,
    removeCollaborator: jest.fn()
  };
  wrapper = mount<Props>(
    <WithFontAwesome>
      <CollaboratorsListBase {...props} />
    </WithFontAwesome>
  );
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
