// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_NOTE':
    return [...state, action.note];

  case 'SET_EXPENSES':
    return action.notes;
  default:
    return state;
  }
};
