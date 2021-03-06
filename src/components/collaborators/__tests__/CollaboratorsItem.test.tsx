import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  CollaboratorsItemProps,
  CollaboratorsItem,
} from "../CollaboratorsItem";
import { collaborators } from "../../../testData/users";
import { WithFontAwesome } from "../../../common/WithFontAwesome";

let props: CollaboratorsItemProps,
  wrapper: ReactWrapper<CollaboratorsItemProps>;

beforeEach(() => {
  props = {
    collaborator: collaborators[0],
    removeCollaborator: jest.fn(),
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
