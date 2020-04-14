import { Note } from "../../store/store.types";
import { BaseFormOptions } from "../form/BaseForm.types";

export enum NoteType {
  text,
  list,
  image,
}

export interface NoteFormValues<T>
  extends Omit<
    Note,
    "id" | "important" | "createdAt" | "updatedAt" | "content"
  > {
  content: T;
  currentOption: BaseFormOptions;
}
