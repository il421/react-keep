// Expenses Reducer
const notesReducerDefaultState = [];

export default (state = notesReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_NOTE':
    return [action.note, ...state];

  case 'SET_NOTES':
    return action.notes;

  case 'REMOVE_NOTE':
    return state.filter((note) => note.id !== action.id);

  case 'UPDATE_NOTE':
    return state.map((note) => {
      if (note.id === action.id) {
        return {
          ...note,
          ...action.updates
        };
      } else {
        return note;
      }
    });

  case 'TOGGLE_IMPORTANCE':
    return state.map((note) => {
      if (note.id === action.id) {
        note.important = !note.important;
      }
      return note;
    });

  case 'REMOVE_TAG_FROM_NOTES':
    return state.map((note) => {
      note.tags = note.tags.filters((tag) => tag.id !== action.id);
      return note;
    });

  case 'UPDATE_NOTES_TAG':
    return state.map((note) => {
      if (note.tags.some(tag => tag.id === action.id)) {
        note.tags.find(tag => tag.id === action.id).value = action.update;
      }
      return note;
    });

  default:
    return state;
  }
};
