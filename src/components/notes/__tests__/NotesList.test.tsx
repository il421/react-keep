import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { NotesListBase, Props } from "../NotesList";
import { notes } from "../../../testData/notes";
import { Provider } from "react-redux";
import { tags } from "../../../testData/tags";
import { Store } from "../../../store/store.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

let wrapper: ReactWrapper | undefined, props: Props;
const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  props = {
    onNoteSelected: jest.fn(),
    removeNote: jest.fn(),
    notes: notes,
    moveToArchive: jest.fn(),
    toggleImportance: jest.fn(),
  };

  wrapper = mount(
    <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
      <NotesListBase {...props} />
    </Provider>
  );
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render NotesList correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});
