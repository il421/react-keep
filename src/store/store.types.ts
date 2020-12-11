import { NoteType } from "../components/notes";
import { User } from "firebase";

export type Store = {
  auth: AuthStoreState;
  notes: NotesStoreState[];
  filters: FiltersStoreState;
  tags: TagsStoreState[];
  collaborators: CollaboratorsStoreState[];
  modals: ModalsStoreState;
};

// AUTH
export interface AuthStoreState {
  uid: string;
  name: string | null;
  url: string | null;
  loading: boolean;
  email?: string;
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

export interface UserData
  extends Pick<User, "uid" | "email" | "displayName" | "photoURL"> {}

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
  collaborators: string[];
  createdBy?: string;
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
  text: string;
  imageUrl: string | null;
  uploadedImage?: File;
  imageId: string | null;
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
// COLLABORATORS
export type Collaborator = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};
export interface CollaboratorsStoreState extends Collaborator {}

export interface SetCollaboratorsAction {
  collaborators: Collaborator[];
  type: CollaboratorsActionsTypes.setCollaborators;
}

export interface AddCollaboratorAction {
  type: CollaboratorsActionsTypes.addCollaborator;
  data: UserData;
}

export interface RemoveCollaboratorAction {
  type: CollaboratorsActionsTypes.removeCollaborator;
  uid: string;
}

export enum CollaboratorsActionsTypes {
  addCollaborator = "addCollaborator",
  setCollaborators = "setCollaborators",
  removeCollaborator = "removeCollaborator",
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
  toggleModal = "toggle",
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

// MODALS

export interface ModalsStoreState {
  user: {
    isOpen: boolean;
  };
  sidebar: {
    isOpen: boolean;
    collapsed: CollapseType[];
  };
  note: {
    isOpen: boolean;
    noteType: NoteType;
    id: string | null;
  };
}

export interface ToggleModalAction {
  modal: Modal;
  isOpen: boolean;
  type: ModalActionsTypes.toggle;
}

export interface SetSidebarCollapseAction {
  collapsed: CollapseType[];
  type: ModalActionsTypes.setCollapsedOptions;
}

export interface ToggleCurrentNoteAction {
  noteType: NoteType;
  isOpen: boolean;
  type: ModalActionsTypes.toggleCurrentNote;
  id: null | string;
}

export type Modal = "user" | "note" | "sidebar";

export enum ModalActionsTypes {
  toggle = "toggle",
  toggleCurrentNote = "toggleCurrentNote",
  setCollapsedOptions = "setCollapsedOptions",
}

export enum CollapseType {
  "tags",
  "arch",
  "collaborators",
}
