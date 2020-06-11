import { parse } from "query-string";
import { ImageItem, ListItem, Note } from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { BaseFormOptions } from "../form/BaseForm.types";
import { v4 as uuidv4 } from "uuid";

/**
 * Method returns selected noted by route query
 * @param search - as history -> location prop
 * @param notes - list of notes
 */
export const getSelectedNote = (search: string, notes: Note[]) => {
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
  currentNote: Note | null;
  defaultValues: NoteFormValues<T>;
}): NoteFormValues<T> => {
  if (options.currentNote) {
    const { title, color, content, tags } = options.currentNote;
    return {
      type: options.type,
      title,
      content: content as T,
      tags,
      color,
      currentOption: BaseFormOptions.none,
    } as NoteFormValues<T>;
  }
  return options.defaultValues;
};

export const getDefaultContent = (
  type: NoteType
): string | ListItem[] | ImageItem => {
  switch (type) {
    case NoteType.text:
      return "" as string;
    case NoteType.list:
      return [
        {
          id: uuidv4(),
          content: "",
          checked: false,
          position: 0,
        },
      ] as ListItem[];
    case NoteType.image:
      return {
        content: "",
        imageUrl: null,
      } as ImageItem;
    default:
      return "";
  }
};
