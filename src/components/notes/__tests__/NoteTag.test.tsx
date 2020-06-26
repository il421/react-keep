import React from "react";
import { shallow } from "enzyme";
import { NoteTagBase } from "../NoteTag";
import toJson from "enzyme-to-json";
import { tags } from "../../../testData/tags";

test("should render NoteTag", () => {
  const textWrapper = shallow(<NoteTagBase tagId={"1"} tags={tags} />);
  expect(toJson(textWrapper)).toMatchSnapshot();
});
