import { QueryKeys } from "../routers/Routing";
import { parse } from "query-string";
import { NoteType } from "../components/notes/notes.types";
import { ListItem } from "../store/store.types";
import { v4 as uuidv4 } from "uuid";

export const nameOf = <T>() => (name: keyof T & string) => name;

export const isModal = (options: {
  query: string;
  type: QueryKeys;
}): boolean => {
  const { query, type } = options;
  return !!query && !!parse(query)[type];
};
