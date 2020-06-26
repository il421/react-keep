import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { NoteForm, Props } from "../NoteForm";
import { Form } from "react-final-form";
import { triggerCheckboxChange } from "../../../common/testUtils";
import { notes } from "../../../testData/notes";
import { tags } from "../../../testData/tags";
import { NoteType } from "../notes.types";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Store } from "../../../store/store.types";

let wrapper: ReactWrapper | undefined, props: Props;
const mockHistoryPush = jest.fn();
const createMockStore = configureMockStore([thunk]);

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?list=add",
  },
};
beforeEach(() => {
  props = {
    notes: notes,
    history: history as any,
    tags: tags,
    type: NoteType.text,
    addNote: jest.fn(),
    updateNote: jest.fn(),
  };

  wrapper = mount(
    <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
      <Form initialValues={{}} onSubmit={() => {}}>
        {() => <NoteForm {...props} />}
      </Form>
    </Provider>
  );
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render NoteForm correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Actions", () => {});
