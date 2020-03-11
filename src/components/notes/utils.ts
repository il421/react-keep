import { parse } from "query-string";
import { RouteActions } from "../../routers/Routing";
import { ListItem, Note } from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { BaseFormOptions } from "../form/BaseForm.types";
import { v4 as uuidv4 } from "uuid";

/**
 * Method returns selected noted by route query
 * @param search - as history -> location prop
 * @param notes - list of notes
 */
export const getSelectedNote = (search: any, notes: Note[]) => {
  const id = parse(search).text;
  if (id && id !== RouteActions.add) {
    return notes.filter((n: Note) => n.id === id)[0];
  }

  return null;
};

/**
 * Method return default form values depending on type
 * @param options: {
 *   type - NoteType,
 *   currentNote - selected note,
 *   defaultValues - empty values
 * }
 */
export const getInitialsFormValues = <T extends string | ListItem[]>(options: {
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
      currentOption: BaseFormOptions.none
    } as NoteFormValues<T>;
  }
  return options.defaultValues;
};


export const getDefaultContent = (type: NoteType): string | ListItem[] => {
  switch (type) {
  case NoteType.text:
    return "";
  case NoteType.list:
    return [
      {
        id: uuidv4(),
        content: "",
        checked: false,
        position: 0
      }
    ];
  default:
    return "";
  }
};
