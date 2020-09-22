import React from "react";
import { ReactWrapper } from "enzyme";
import { NotesListBase, Props } from "../NotesList";
import { notes } from "../../../testData/notes";
import { mountInApp } from "../../../common/testUtils";
import { collaborators } from "../../../testData/users";
import { defaultAuthState } from "../../../actions/__tests__/auth.test";

let wrapper: ReactWrapper | undefined, props: Props;

beforeEach(() => {
  props = {
    onNoteSelected: jest.fn(),
    removeNote: jest.fn(),
    notes: notes,
    collaborators: collaborators,
    auth: defaultAuthState.auth,
    moveToArchive: jest.fn(),
    toggleImportance: jest.fn(),
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
