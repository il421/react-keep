import {NoteType} from "../components/notes/notes.types";
import {User} from "firebase";

export type Store =  {
    auth: AuthStoreState,
    notes: NotesStoreState,
    filters: FiltersStoreState,
    tags: TagsStoreState
}

// AUTH
export interface AuthStoreState {
    uid: string;
    name: string | null;
    url: string | null;
    loading: boolean;
}

export interface LoginAction extends Omit<AuthStoreState, "loading"> {
    type: AuthActionsTypes.login
}

export interface LogoutAction {
    type: AuthActionsTypes.logout
}

export interface LoadingAction extends Pick<AuthStoreState, "loading">{
    type: AuthActionsTypes.loading
}

export interface UpdateUser extends Pick<User, "displayName" | "photoURL"> {}

// FILTER
export interface FiltersStoreState extends Filters {}

export interface Filters {
    tagFilters: string[];
    search: string;
}

export interface SearchFilterAction extends Pick<Filters, "search"> {
    type: FiltersActionsTypes.setSearchFilter
}

export interface TagsFilterAction extends Pick<Filters, "tagFilters"> {
    type: FiltersActionsTypes.setTagsFilter
}

// NOTES
export interface NotesStoreState extends Note {}

export interface Note {
  type: NoteType;
  id: string;
  title: string;
  content: string | ListItem[];
  tags: string[];
  color: string;
  important: boolean,
  createdAt: number,
  updatedAt: number
}

export interface AddNote extends Omit<Note, "id" | "important" | "createdAt" | "updatedAt"> {}

export interface ListItem {
  id: string;
  content: string;
}

export interface SetNotesAction {
    type: NotesActionsTypes.setNotes,
    notes: Note[]
}

export interface AddNoteAction {
    type: NotesActionsTypes.addNote,
    note: Note
}

export interface RemoveNoteAction extends Pick<Note, "id"> {
    type: NotesActionsTypes.removeNote
}

export interface UpdateNoteAction extends Pick<Note, "id"> {
    type: NotesActionsTypes.updateNote,
    updates: Note
}

export interface ToggleImportantAction extends Pick<Note, "id"> {
    type: NotesActionsTypes.toggleImportance
}

export interface RemoveNoteTagAction {
    type: NotesActionsTypes.removeTagFromNote,
    tagId: string;
}

// TAGS
export interface TagsStoreState {
  list: Tag[],
  displayTagsModal: boolean
}

export interface Tag {
    id: string;
    value: string;
}

export interface SetTagsAction {
    tags: Tag[]
    type: TagsActionsTypes.setTags;
}

export interface AddTagAction {
    type: TagsActionsTypes.addTag;
    tag: Tag
}

export interface RemoveTagAction extends Pick<Tag, "id"> {
    type: TagsActionsTypes.removeTag;
}

export interface UpdateTagAction extends Pick<Tag, "id"> {
    update: Tag
    type: TagsActionsTypes.updateTag;
}

export interface DisplayTagsModalAction {
    type: TagsActionsTypes.displayTagsModal,
    displayTagsModal: boolean
}

export enum AuthActionsTypes {
    login = "login",
    logout = "logout",
    loading= "loading"
}

export enum FiltersActionsTypes {
    setSearchFilter = "setSearchFilter",
    setTagsFilter = "setTagsFilter"
}

export enum NotesActionsTypes {
    addNote = "addNote",
    setNotes = "setNotes",
    removeNote = "removeNote",
    updateNote = "updateNote",
    toggleImportance = "toggleImportance",
    removeTagFromNote = "removeTagFromNote"
}
export enum TagsActionsTypes {
    addTag = "addTag",
    setTags = "setTags",
    removeTag = "removeTag",
    updateTag = "updateTag",
    displayTagsModal = "displayTagsModal"
}
