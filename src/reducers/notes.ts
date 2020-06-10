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
} from "../store/store.types";

type NotesAction =
  | SetNotesAction
  | AddNoteAction
  | RemoveNoteAction
  | RemoveNoteTagAction
  | UpdateNoteAction
  | ToggleImportantAction
  | ToggleArchiveAction;

export const notesReducerDefaultState: NotesStoreState[] = [];

export default (
  state: NotesStoreState[] = notesReducerDefaultState,
  action: NotesAction
): NotesStoreState[] => {
  switch (action.type) {
    case NotesActionsTypes.addNote:
      return [action.note, ...state];

    case NotesActionsTypes.setNotes:
      return action.notes ?? [];

    case NotesActionsTypes.removeNote:
      return state.filter((note) => note.id !== action.id);

    case NotesActionsTypes.updateNote:
      return state.map((note) => {
        if (note.id === action.id) {
          return {
            ...note,
            ...action.updates,
          };
        } else {
          return note;
        }
      });

    case NotesActionsTypes.toggleImportance:
      return state.map((note) => {
        if (note.id === action.id) {
          note.important = !note.important;
        }
        return note;
      });

    case NotesActionsTypes.toggleArchive:
      return state.map((note) => {
        if (note.id === action.id) {
          note.archive = !note.archive;
        }
        return note;
      });

    case NotesActionsTypes.removeTagFromNote:
      return state.map((note) => {
        if (note.tags.length > 0) {
          note.tags = note.tags.filter((tag) => tag !== action.tagId);
        }
        return note;
      });

    default:
      return state;
  }
};
