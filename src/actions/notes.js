
export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const removeNote = ({id}) => ({
  type: 'REMOVE_NOTE',
  id
});

export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes
});

export const updateNote = ( id, updates ) => ({
  type: 'UPDATE_NOTE',
  id,
  updates
});
