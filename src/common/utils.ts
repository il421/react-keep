import { QueryKeys } from "../routers/Routing";
import { parse } from "query-string";
import { Filters, ImageItem, ListItem, Note } from "../store/store.types";
import { NoteType } from "../components/notes";
import { MutableState, Mutator, Tools } from "final-form";

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
        contentMatch = (note.content as ImageItem).text
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

export const getShortText = (
  text: string,
  maxLength?: number,
  hasDots: boolean = true
): string => {
  const MAX_LENGTH = maxLength ?? 100;
  if (text.length > MAX_LENGTH) {
    text = text.slice(0, MAX_LENGTH);

    if (hasDots) {
      text = text + "...";
    }
  }

  return text;
};

export const toggleArrayElement = <T>(arr: T[], item: any): any[] =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

// react-final-form-array mutator to sort an array
export const sortArray: Mutator<any> = <FromValues>(
  [name, compareFn]: [string, (a: any, b: any) => number],
  state: MutableState<FromValues>,
  tools: Tools<any>
) => {
  type FormValues = {
    [key: string]: any;
  };
  const sortedArray = (state.formState.values as FormValues)[name].sort(
    compareFn
  );
  tools.setIn(state, "formState.values" + name, sortedArray);
};

export const getRandomColor = (): string => {
  const letters: string = "0123456789ABCDEF";
  let color: string = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const unique = <T>(items: T[]): T[] => {
  return Array.from(new Set(items));
};
