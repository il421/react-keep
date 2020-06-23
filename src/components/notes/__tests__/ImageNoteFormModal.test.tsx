import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  ImageNoteFormModalProps,
  ImageNoteFormModal,
} from "../ImageNoteFormModal";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Store } from "../../../store/store.types";
import { notes } from "../../../testData/notes";
import { tags } from "../../../testData/tags";

let wrapper: ReactWrapper, props: ImageNoteFormModalProps;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?image=add",
  },
};
const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  props = {
    history: history as any,
  };
  wrapper = mount(
    <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
      <ImageNoteFormModal {...props} />
    </Provider>
  );
});

describe("Rendering", () => {
  test("should render ImageNoteFormModal correctly", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

//@todo need to finish
