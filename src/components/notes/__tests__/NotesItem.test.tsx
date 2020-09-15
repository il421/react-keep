import React from "react";
import { ReactWrapper } from "enzyme";
import { NotesItem, NoteProps } from "../NotesItem";
import { notes } from "../../../testData/notes";
import { NoteType } from "../notes.types";
import { flushPromises, mountInApp } from "../../../common/testUtils";
import { collaborators } from "../../../testData/users";
import { Collaborator } from "../../../store/store.types";

let wrapper: ReactWrapper | undefined, props: NoteProps;

beforeEach(() => {
  props = {
    note: notes[3],
    removeNote: jest.fn(),
    moveToArchive: jest.fn(),
    toggleImportance: jest.fn(),
    onNoteSelected: jest.fn(),
    getCollaborator: jest.fn(),
  };

  wrapper = mountInApp(<NotesItem {...props} />);
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
      expect(props.onNoteSelected).toHaveBeenLastCalledWith(NoteType.text, "4");
    }
  });

  test("should toggle importance", () => {
    if (wrapper) {
      wrapper.find("#test-toggle-importance-4").hostNodes().simulate("click");
      expect(props.toggleImportance).toHaveBeenLastCalledWith("4");
    }
  });

  test("should move a note to archive", () => {
    if (wrapper) {
      wrapper.find("#test-toggle-arch-4").hostNodes().simulate("click");
      wrapper.update();

      wrapper
        .find("#test-confirm-dialog-delete-btn")
        .hostNodes()
        .simulate("click");

      expect(props.moveToArchive).toHaveBeenLastCalledWith("4");
    }
  });

  test("should delete a note to archive", () => {
    if (wrapper) {
      wrapper.find("#test-delete-note-4").hostNodes().simulate("click");
      wrapper.update();

      wrapper
        .find("#test-confirm-dialog-delete-btn")
        .hostNodes()
        .simulate("click");

      expect(props.removeNote).toHaveBeenLastCalledWith("4");
    }
  });

  test("should show collaborators icons", async () => {
    wrapper = mountInApp(
      <NotesItem
        {...props}
        note={notes[0]}
        getCollaborator={(uid) =>
          collaborators.find((c: Collaborator) => c.uid === uid)
        }
      />
    );
    wrapper.update();

    if (wrapper) {
      expect(wrapper.find(".coin").length).toBe(4);
    }
  });
});
