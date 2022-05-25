import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import { notes } from "../../../testData/notes";
import { ArchiveListBase, Props } from "../ArchiveList";

let props: Props, wrapper: ShallowWrapper<Props, {}>;

beforeEach(() => {
  props = {
    notes,
    unarchiveNote: jest.fn()
  };

  wrapper = shallow<Props>(<ArchiveListBase {...props} />);
});

test("should render ArchiveList", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});
