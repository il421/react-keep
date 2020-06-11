import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { DashboardPage, onNoteSelected } from "../DashboardPage";
import { createBrowserHistory, History } from "history";
import { NoteType } from "../../notes/notes.types";

export const history: History = createBrowserHistory();

test("should render DashboardPage correctly", () => {
  const wrapper: ShallowWrapper<typeof DashboardPage, any> = shallow<
    typeof DashboardPage
  >(<DashboardPage history={history} />);
  expect(wrapper.debug()).toMatchSnapshot();
});

test("onNoteSelected should call history.push with correct pathname", () => {
  const push = jest.spyOn(history, "push");
  onNoteSelected({
    type: NoteType.text,
    id: "123",
    pathname: "pathname",
    push: push as any,
  });
  expect(push).toBeCalledWith("pathname?text=123");

  onNoteSelected({
    type: NoteType.list,
    id: "123",
    pathname: "pathname",
    push: push as any,
  });
  expect(push).toBeCalledWith("pathname?list=123");

  onNoteSelected({
    type: NoteType.image,
    id: "123",
    pathname: "pathname",
    push: push as any,
  });
  expect(push).toBeCalledWith("pathname?image=123");
});
