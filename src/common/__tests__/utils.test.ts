import { QueryKeys } from "../../routers/Routing";
import {
  getFilteredNotes,
  getShortText,
  isModal,
  nameOf,
  toggleArrayElement,
} from "../utils";
import { notes } from "../../testData/notes";
import { Note } from "../../store/store.types";
import { tags } from "../../testData/tags";

interface TestValues {
  name: string;
  age: string;
}

describe("Utils", () => {
  test("should correct return boolean isModal", () => {
    const imageQuery = "image=8Dy4dqOAX2GYvUIFzzqD";
    const listQuery = "list=kKsPrTgqkZe6bhml3ral";
    const textQuery = "text=add";
    const userQuery = "user=edit";

    expect(isModal({ query: imageQuery, type: QueryKeys.image })).toBeTruthy();
    expect(isModal({ query: listQuery, type: QueryKeys.list })).toBeTruthy();
    expect(isModal({ query: textQuery, type: QueryKeys.text })).toBeTruthy();
    expect(isModal({ query: userQuery, type: QueryKeys.user })).toBeTruthy();
    expect(isModal({ query: userQuery, type: QueryKeys.text })).toBeFalsy();
  });

  test("should toggle an element in an array", () => {
    const arr: string[] = notes.map((n) => n.title);
    expect(toggleArrayElement(arr, notes[0].title)).toEqual(
      arr.filter((el) => el !== notes[0].title)
    );

    expect(toggleArrayElement(arr, "test")).toEqual([...arr, "test"]);
  });

  test("should return a short text", () => {
    const string: string =
      "should return a short text should return a short text";

    expect(getShortText(string, 10)).toBe("should ret...");
  });

  test("should return correct name from interface", () => {
    const name = nameOf<TestValues>();

    expect(name("name")).toBe("name");
    expect(name("age")).toBe("age");
  });

  test("should correct return filtered notes with searched text (case 1)", () => {
    // case where there is match in two noted, but the second one has archive status true
    const filteredNotes = getFilteredNotes(notes, {
      search: "teXt",
      tagFilters: [],
    });

    expect(filteredNotes).toEqual([notes[0]]);
  });

  test("should correct return filtered notes with searched text (case 2)", () => {
    // case where there is match in two noted
    const notesArr: Note[] = [
      notes[0],
      notes[1],
      { ...notes[2], archive: false },
    ];

    const filteredNotes = getFilteredNotes(notesArr, {
      search: "teXt",
      tagFilters: [],
    });

    expect(filteredNotes).toEqual([notesArr[0], notesArr[2]]);
  });

  test("should correct return filtered notes with searched text (case 3)", () => {
    // case where there is match one note with list type
    const filteredNotes = getFilteredNotes(notes, {
      search: "dog",
      tagFilters: [],
    });

    expect(filteredNotes).toEqual([notes[1]]);
  });

  test("should correct return filtered notes with searched text (case 4)", () => {
    // case where there is match one note in title
    const filteredNotes = getFilteredNotes(notes, {
      search: "1",
      tagFilters: [],
    });

    expect(filteredNotes).toEqual([notes[0]]);
  });

  test("should correct return filtered notes with tags", () => {
    // case where there is match one note in title
    const filteredNotes = getFilteredNotes(notes, {
      search: "",
      tagFilters: [tags[0].id],
    });

    expect(filteredNotes).toEqual([notes[1], notes[0]]);
  });
});
