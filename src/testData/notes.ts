import { Note } from "../store/store.types";
import { NoteType } from "../components/notes";
import { tags } from "./tags";
import { collaborators, user } from "./users";

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
    collaborators: collaborators.map((c) => c.uid),
    createdBy: user.uid,
  },
  {
    type: NoteType.list,
    id: "2",
    title: "2",
    collaborators: [],
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
    content: { text: "text", imageUrl: "imageUrl", imageId: "imageId" },
    tags: [tags[1].id],
    color: "#3",
    collaborators: [],
    important: false,
    archive: true,
    createdAt: 100000,
    updatedAt: 100005,
  },
  {
    type: NoteType.text,
    id: "4",
    title: "4",
    content: "text",
    tags: [tags[0].id],
    collaborators: [],
    color: "#1",
    important: false,
    archive: false,
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
  collaborators: [],
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
  collaborators: [],
  updatedAt: 43432432,
};
