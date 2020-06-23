import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ArchiveItem, ArchiveItemProps } from "../ArchiveItem";
import { notes } from "../../../testData/notes";

let props: ArchiveItemProps, wrapper: ShallowWrapper<ArchiveItemProps, any>;

beforeEach(() => {
  props = {
    note: notes[0],
    unarchiveNote: jest.fn(),
  };

  wrapper = shallow<ArchiveItemProps>(<ArchiveItem {...props} />);
});

test("should render ArchiveItem", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should unarchive note if click on button", () => {
  wrapper.find("IconButton").at(0).prop<any>("onButtonClick")();
  expect(props.unarchiveNote).toHaveBeenLastCalledWith(notes[0].id);
});
