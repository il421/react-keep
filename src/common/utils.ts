import { QueryKeys } from "../routers/Routing";
import { parse } from "query-string";
import { ListItem, Note } from "../store/store.types";
import { NoteType } from "../components/notes/notes.types";

export const nameOf = <T>() => (name: keyof T & string) => name;

export const isModal = (options: {
  query: string;
  type: QueryKeys;
}): boolean => {
  const { query, type } = options;
  return !!query && !!parse(query)[type];
};

interface Filters {
  searchText: string;
  tags: string[];
}
export const getFilteredNotes = (notes: Note[], filters: Filters) => {
  const { searchText, tags } = filters;
  const filteredNotes = notes.filter((note) => {
    // dont show archived notes
    if (note.archive) {
      return false;
    }

    let contentMatch: boolean = true;
    const titleMatch: boolean = note.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    let tagsMatch: boolean = true;

    switch (note.type) {
      case NoteType.text:
        contentMatch = (note.content as string)
          .toLowerCase()
          .includes(searchText.toLowerCase());
        break;
      case NoteType.list:
        contentMatch = (note.content as ListItem[]).some((item) =>
          item.content.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
    }

    if (tags.length > 0) {
      tagsMatch = note.tags.some((id) => tags.includes(id));
    }

    return (contentMatch || titleMatch) && tagsMatch;
  });

  return filteredNotes.reduce((acc: Note[], note: Note) => {
    if (note.important) {
      return [note, ...acc];
    }
    return [...acc, note];
  }, []);
};

export const getShortText = (text: string) => {
  const MAX_LENGTH = 100;
  if (text.length > MAX_LENGTH) {
    text = text.slice(0, MAX_LENGTH) + "...";
  }

  return text;
};

export const toggleArrayElement = (arr: any[], item: any): any[]  =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
