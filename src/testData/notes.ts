import { Note } from "../store/store.types";
import { NoteType } from "../components/notes";
import { tags } from "./tags";

export const notes: Note[] = [
  {
    type: NoteType.text,
    id: "1",
    title: "1",
    content: "text",
    tags: [tags[0].id],
    color: "#1",
    important: false,
    archive: false,
    createdAt: 100000,
    updatedAt: 100005,
  },
  {
    type: NoteType.list,
    id: "2",
    title: "2",
    content: [
      {
        id: "2-1",
        content: "dog",
        checked: false,
      },
      {
        id: "2-2",
        content: "cat",
        checked: true,
      },
    ],
    tags: [tags[0].id, tags[1].id],
    color: "#2",
    important: true,
    archive: false,
    createdAt: 100000,
    updatedAt: 100005,
  },
  {
    type: NoteType.image,
    id: "3",
    title: "3",
    content: { text: "text", imageUrl: "imageUrl" },
    tags: [tags[1].id],
    color: "#3",
    important: false,
    archive: true,
    createdAt: 100000,
    updatedAt: 100005,
  },
];

export const newNote: Omit<Note, "id" | "createdAt" | "updatedAt"> = {
  color: "#cbf0f8",
  important: false,
  archive: false,
  tags: [tags[0].id],
  type: NoteType.text,
  content: "Dont forget to make a call",
  title: "Call",
};

export const updatedNote: Omit<Note, "id"> = {
  color: "#cbf0f8",
  important: false,
  archive: false,
  tags: [tags[0].id],
  type: NoteType.text,
  content: "Dont forget to make a call",
  title: "Call",
  createdAt: 54353534,
  updatedAt: 43432432,
};
