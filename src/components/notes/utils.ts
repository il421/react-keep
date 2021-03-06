import { parse } from "query-string";
import { ImageItem, ListItem, Note } from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { v4 as uuidv4 } from "uuid";

/**
 * Method returns selected noted by route query
 * @param search - as history -> location prop
 * @param notes - list of notes
 */
export const getSelectedNote = (
  search: string,
  notes: Note[]
): Note | undefined => {
  const textId = parse(search).text;
  const listId = parse(search).list;
  const imageId = parse(search).image;

  return notes.filter((n: Note) => n.id === (textId ?? listId ?? imageId))[0];
};

/**
 * Method return default form values depending on type
 * @param options: {
 *   type - NoteType,
 *   currentNote - selected note,
 *   defaultValues - empty values
 * }
 */
export const getInitialNoteFormValues = <
  T extends string | ListItem[] | ImageItem
>(options: {
  type: NoteType;
  currentNote: Note | undefined;
  defaultValues: NoteFormValues<T>;
}): NoteFormValues<T> => {
  if (options.currentNote) {
    const { title, color, content, tags, collaborators } = options.currentNote;
    return {
      type: options.type,
      title,
      content:
        // sort the initial state if list note
        options.type === NoteType.list
          ? (content as ListItem[]).sort(
              (a: ListItem, b: ListItem) =>
                Number(a.checked) - Number(b.checked)
            )
          : (content as T),
      tags,
      color,
      collaborators,
    } as NoteFormValues<T>;
  }
  return options.defaultValues;
};

export const getDefaultContent = <T extends string | ListItem[] | ImageItem>(
  type: NoteType
): T => {
  switch (type) {
    case NoteType.text:
      return "" as T;
    case NoteType.list:
      return [
        {
          id: uuidv4(),
          content: "",
          checked: false,
          position: 0,
        },
      ] as T;
    case NoteType.image:
      return {
        text: "",
        imageUrl: null,
        imageId: null,
      } as T;
    default:
      return "" as T;
  }
};
