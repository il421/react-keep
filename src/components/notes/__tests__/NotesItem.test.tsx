import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { NotesItem, NoteProps } from "../NotesItem";
import { notes } from "../../../testData/notes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { tags } from "../../../testData/tags";
import { Store } from "../../../store/store.types";
import { NoteType } from "../notes.types";

let wrapper: ReactWrapper | undefined, props: NoteProps;
const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  props = {
    note: notes[0],
    removeNote: jest.fn(),
    moveToArchive: jest.fn(),
    toggleImportance: jest.fn(),
    onNoteSelected: jest.fn(),
  };

  wrapper = mount(
    <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
      <NotesItem {...props} />
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
  test("should render NotesItem correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Actions", () => {
  test("should select note", () => {
    if (wrapper) {
      wrapper.find(".note").hostNodes().simulate("click");
      expect(props.onNoteSelected).toHaveBeenLastCalledWith(NoteType.text, "1");
    }
  });

  test("should toggle importance", () => {
    if (wrapper) {
      wrapper.find("#test-toggle-importance-1").hostNodes().simulate("click");
      expect(props.toggleImportance).toHaveBeenLastCalledWith("1");
    }
  });

  test("should move a note to archive", () => {
    if (wrapper) {
      wrapper.find("#test-toggle-arch-1").hostNodes().simulate("click");
      wrapper.update();

      wrapper
        .find("#test-confirm-dialog-delete-btn")
        .hostNodes()
        .simulate("click");

      expect(props.moveToArchive).toHaveBeenLastCalledWith("1");
    }
  });

  test("should delete a note to archive", () => {
    if (wrapper) {
      wrapper.find("#test-delete-note-1").hostNodes().simulate("click");
      wrapper.update();

      wrapper
        .find("#test-confirm-dialog-delete-btn")
        .hostNodes()
        .simulate("click");

      expect(props.removeNote).toHaveBeenLastCalledWith("1");
    }
  });
});
