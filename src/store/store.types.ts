import { NoteType } from "../components/notes";
import { User } from "firebase";

export type Store = {
  auth: AuthStoreState;
  notes: NotesStoreState[];
  filters: FiltersStoreState;
  tags: TagsStoreState[];
};

// AUTH
export interface AuthStoreState {
  uid: string;
  name: string | null;
  url: string | null;
  loading: boolean;
}

export interface LoginAction extends Omit<AuthStoreState, "loading"> {
  type: AuthActionsTypes.login;
}

export interface LogoutAction {
  type: AuthActionsTypes.logout;
}

export interface LoadingAction extends Pick<AuthStoreState, "loading"> {
  type: AuthActionsTypes.loading;
}

export interface UpdateUser
  extends Pick<User, "displayName" | "photoURL" | "tenantId"> {
  photoFile?: File;
}

// FILTER
export interface FiltersStoreState extends Filters {}

export interface Filters {
  tagFilters: string[];
  search: string;
}

export interface SearchFilterAction extends Pick<Filters, "search"> {
  type: FiltersActionsTypes.setSearchFilter;
}

export interface TagsFilterAction {
  type: FiltersActionsTypes.setTagFilter;
  tag: string;
}

// NOTES
export interface NotesStoreState extends Note {}

export interface Note {
  type: NoteType;
  id: string;
  title: string;
  content: string | ListItem[] | ImageItem;
  tags: string[];
  color: string;
  important: boolean;
  archive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface AddNote
  extends Omit<
    Note,
    "id" | "important" | "archive" | "createdAt" | "updatedAt"
  > {}

export interface UpdateNote extends Omit<Note, "id"> {}

export interface ListItem {
  id: string;
  content: string;
  checked: boolean;
  position?: number;
}

export interface ImageItem {
  content: string;
  imageUrl: string | null;
  uploadingImage?: File;
}

export interface SetNotesAction {
  type: NotesActionsTypes.setNotes;
  notes: Note[];
}

export interface AddNoteAction {
  type: NotesActionsTypes.addNote;
  note: Note;
}

export interface RemoveNoteAction extends Pick<Note, "id"> {
  type: NotesActionsTypes.removeNote;
}

export interface UpdateNoteAction extends Pick<Note, "id"> {
  type: NotesActionsTypes.updateNote;
  updates: UpdateNote;
}

export interface ToggleArchiveAction extends Pick<Note, "id"> {
  type: NotesActionsTypes.toggleArchive;
}

export interface ToggleImportantAction extends Pick<Note, "id"> {
  type: NotesActionsTypes.toggleImportance;
}

export interface RemoveNoteTagAction {
  type: NotesActionsTypes.removeTagFromNote;
  tagId: string;
}

// TAGS
export interface TagsStoreState extends Tag {}

export interface Tag {
  id: string;
  value: string;
}

export interface SetTagsAction {
  tags: Tag[];
  type: TagsActionsTypes.setTags;
}

export interface AddTagAction {
  type: TagsActionsTypes.addTag;
  tag: Tag;
}

export interface RemoveTagAction extends Pick<Tag, "id"> {
  type: TagsActionsTypes.removeTag;
}

export enum AuthActionsTypes {
  login = "login",
  logout = "logout",
  loading = "loading",
}

export enum FiltersActionsTypes {
  setSearchFilter = "setSearchFilter",
  setTagFilter = "setTagFilter",
}

export enum NotesActionsTypes {
  addNote = "addNote",
  setNotes = "setNotes",
  removeNote = "removeNote",
  updateNote = "updateNote",
  toggleImportance = "toggleImportance",
  toggleArchive = "toggleArchive",
  removeTagFromNote = "removeTagFromNote",
}
export enum TagsActionsTypes {
  addTag = "addTag",
  setTags = "setTags",
  removeTag = "removeTag",
  updateTag = "updateTag",
}
