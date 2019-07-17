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

const getShortText = (text) => {
  const maxLength = 200;
  if (text.length > maxLength) {
    text = text.slice(0, 300) + '...';
  }
  return text.replace(/\n/g, '<br />');
};


export { getFilteredNotes, getShortText };
