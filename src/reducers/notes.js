// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_NOTE':
    return [action.note, ...state];

  case 'REMOVE_NOTE':
    return state.filter(({ id }) => id !== action.id);

  case 'SET_EXPENSES':
    return action.notes;
  default:
    return state;
  }
};
