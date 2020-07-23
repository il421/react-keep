import { Note } from "../../store/store.types";

export enum NoteType {
  text,
  list,
  image,
}

export interface NoteFormValues<T>
  extends Omit<
    Note,
    "id" | "important" | "archive" | "createdAt" | "updatedAt" | "content"
  > {
  content: T;
}
