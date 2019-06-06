// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_NOTE':
    return [action.note, ...state];

  case 'SET_NOTES':
    return action.notes

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

  default:
    return state;
  }
};
