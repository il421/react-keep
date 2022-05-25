import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { tags } from "../../../testData/tags";
import { NoteTagBase } from "../NoteTag";

test("should render NoteTag", () => {
  const textWrapper = shallow(<NoteTagBase tagId="1" tags={tags} />);
  expect(toJson(textWrapper)).toMatchSnapshot();
});
