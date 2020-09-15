import notesReducer, { notesReducerDefaultState } from "../../reducers/notes";
import {
  AddNoteAction,
  NotesActionsTypes,
  NotesStoreState,
  RemoveNoteAction,
  RemoveNoteTagAction,
  SetNotesAction,
  ToggleArchiveAction,
  ToggleImportantAction,
  UpdateNoteAction,
} from "../../store/store.types";
import { notes } from "../../testData/notes";
import { tags } from "../../testData/tags";

describe("Notes reducer", () => {
  test("should set notes", () => {
    const action: SetNotesAction = {
      type: NotesActionsTypes.setNotes,
      notes,
    };

    const state = notesReducer(
      notesReducerDefaultState,
      action
    ) as NotesStoreState[];

    expect(state).toBe(action.notes);
  });

  test("should add note", () => {
    const action: AddNoteAction = {
      type: NotesActionsTypes.addNote,
      note: notes[0],
    };

    const state = notesReducer(
      notesReducerDefaultState,
      action
    ) as NotesStoreState[];

    expect(state).toEqual([action.note]);
  });

  test("should remove note", () => {
    const action: RemoveNoteAction = {
      type: NotesActionsTypes.removeNote,
      id: notes[0].id,
    };

    const state = notesReducer(notes, action) as NotesStoreState[];

    expect(state).toEqual([notes[1], notes[2], notes[3]]);
  });

  test("should update note", () => {
    const action: UpdateNoteAction = {
      type: NotesActionsTypes.updateNote,
      updates: { ...notes[0], title: "test" },
      id: notes[0].id,
    };

    const state = notesReducer(notes, action) as NotesStoreState[];

    expect(state[0].title).toEqual("test");
  });

  test("should toggle note importance", () => {
    const action: ToggleImportantAction = {
      type: NotesActionsTypes.toggleImportance,
      id: notes[0].id,
    };

    const state = notesReducer(notes, action) as NotesStoreState[];

    expect(state[0].important).toBeTruthy();
  });

  test("should toggle note archive status", () => {
    const action: ToggleArchiveAction = {
      type: NotesActionsTypes.toggleArchive,
      id: notes[0].id,
    };

    const state = notesReducer(notes, action) as NotesStoreState[];

    expect(state[0].archive).toBeTruthy();
  });

  test("should remove tag from note", () => {
    const action: RemoveNoteTagAction = {
      type: NotesActionsTypes.removeTagFromNote,
      tagId: tags[0].id,
    };

    const state = notesReducer(notes, action) as NotesStoreState[];

    expect(state[0].tags.length).toBe(0);
  });
});
