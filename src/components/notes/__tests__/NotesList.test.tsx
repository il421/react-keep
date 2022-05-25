import { ReactWrapper } from "enzyme";
import React from "react";

import { defaultAuthState } from "../../../actions/__tests__/auth.test";
import { mountInApp } from "../../../common/testUtils";
import { notes } from "../../../testData/notes";
import { collaborators } from "../../../testData/users";
import { NotesListBase, Props } from "../NotesList";

let wrapper: ReactWrapper | undefined, props: Props;

beforeEach(() => {
  props = {
    onNoteSelected: jest.fn(),
    removeNote: jest.fn(),
    notes,
    collaborators,
    auth: defaultAuthState.auth,
    moveToArchive: jest.fn(),
    toggleImportance: jest.fn()
  };

  wrapper = mountInApp(<NotesListBase {...props} />);
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

// @TODO skipped for now because of https://github.com/wwayne/react-tooltip/issues/595
describe("Rendering", () => {
  test.skip("should render NotesList correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});
