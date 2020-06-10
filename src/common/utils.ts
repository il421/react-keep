import { QueryKeys } from "../routers/Routing";
import { parse } from "query-string";
import { Filters, ImageItem, ListItem, Note } from "../store/store.types";
import { NoteType } from "../components/notes/notes.types";

export const nameOf = <T>() => (name: keyof T & string) => name;

export const isModal = (options: {
  query: string;
  type: QueryKeys;
}): boolean => {
  const { query, type } = options;
  return !!query && !!parse(query)[type];
};

export const getFilteredNotes = (notes: Note[], filters: Filters): Note[] => {
  const { search, tagFilters } = filters;
  const filteredNotes = notes.filter((note) => {
    // dont show archived notes
    if (note.archive) {
      return false;
    }

    let contentMatch: boolean = true;
    const titleMatch: boolean = note.title
      .toLowerCase()
      .includes(search.toLowerCase());
    let tagsMatch: boolean = true;

    switch (note.type) {
      case NoteType.text:
        contentMatch = (note.content as string)
          .toLowerCase()
          .includes(search.toLowerCase());
        break;

      case NoteType.image:
        contentMatch = (note.content as ImageItem).content
          .toLowerCase()
          .includes(search.toLowerCase());
        break;

      case NoteType.list:
        contentMatch = (note.content as ListItem[]).some((item) =>
          item.content.toLowerCase().includes(search.toLowerCase())
        );
        break;
    }

    if (tagFilters.length > 0) {
      tagsMatch = note.tags.some((id) => tagFilters.includes(id));
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

export const getShortText = (text: string, maxLength?: number): string => {
  const MAX_LENGTH = maxLength ?? 100;
  if (text.length > MAX_LENGTH) {
    text = text.slice(0, MAX_LENGTH) + "...";
  }

  return text;
};

export const toggleArrayElement = (arr: any[], item: any): any[] =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
