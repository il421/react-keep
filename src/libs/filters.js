const getFilteredNotes = (notes, searchText, tagFilters) => {
  return notes.filter((note) => {
    // filter by search query
    const textMatch = typeof searchText === 'string' && note.text.toLowerCase().includes(searchText.toLowerCase());

    // filter by tags
    let tagsMatch = true;
    if (tagFilters.length > 0) {
      tagsMatch = !note.tags.some(tag => tagFilters.includes(tag.id) );
    }

    return textMatch && tagsMatch;
  });
};

export default getFilteredNotes;
