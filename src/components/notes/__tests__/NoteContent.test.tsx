import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { notes } from "../../../testData/notes";
import { NoteContent } from "../NoteContent";
import { NoteType } from "../notes.types";

test("should render NoteContent", () => {
  const textWrapper = shallow(
    <NoteContent type={NoteType.text} content={notes[0].content} />
  );
  expect(toJson(textWrapper)).toMatchSnapshot();

  const listWrapper = shallow(
    <NoteContent type={NoteType.list} content={notes[1].content} />
  );
  expect(toJson(listWrapper)).toMatchSnapshot();

  const imageWrapper = shallow(
    <NoteContent type={NoteType.image} content={notes[2].content} />
  );
  expect(toJson(imageWrapper)).toMatchSnapshot();
});
