import { mount, ReactWrapper } from "enzyme";
import React from "react";

import { WithFontAwesome } from "../../../common/WithFontAwesome";
import { collaborators } from "../../../testData/users";
import {
  CollaboratorsItemProps,
  CollaboratorsItem
} from "../CollaboratorsItem";

let props: CollaboratorsItemProps,
  wrapper: ReactWrapper<CollaboratorsItemProps>;

beforeEach(() => {
  props = {
    collaborator: collaborators[0],
    removeCollaborator: jest.fn()
  };
  wrapper = mount<CollaboratorsItemProps>(
    <WithFontAwesome>
      <CollaboratorsItem {...props} />
    </WithFontAwesome>
  );
});

test("should render CollaboratorsItem", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should call removeCollaborator if click the remove button", () => {
  wrapper.find("button").simulate("click");
  expect(props.removeCollaborator).toHaveBeenLastCalledWith(
    collaborators[0].uid
  );
});
