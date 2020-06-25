import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ArchiveListBase, Props } from "../ArchiveList";
import { notes } from "../../../testData/notes";

let props: Props, wrapper: ShallowWrapper<Props, {}>;

beforeEach(() => {
  props = {
    notes: notes,
    unarchiveNote: jest.fn(),
  };

  wrapper = shallow<Props>(<ArchiveListBase {...props} />);
});

test("should render ArchiveList", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});
