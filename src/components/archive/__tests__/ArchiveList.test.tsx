import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ArchiveList, Props } from "../ArchiveList";
import { notes } from "../../../testData/notes";

let props: Props, wrapper: ShallowWrapper<Props, {}>;

beforeEach(() => {
  props = {
    notes: notes,
    unarchiveNote: jest.fn(),
  };

  wrapper = shallow<Props>(<ArchiveList {...props} />);
});

test("should render ArchiveList", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});
