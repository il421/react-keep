import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  triggerCheckboxChange,
  triggerInputChange
} from "../../../common/testUtils";
import { ListItem, Store } from "../../../store/store.types";
import { notes } from "../../../testData/notes";
import { tags } from "../../../testData/tags";
import {
  TextNoteFormModalProps,
  TextNoteFormModal
} from "../TextNoteFormModal";

let wrapper: ReactWrapper | undefined, props: TextNoteFormModalProps;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?text=add"
  }
};

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  props = {
    history: history as any
  };
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render TextNoteFormModal correctly", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <TextNoteFormModal {...props} />
      </Provider>
    );

    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });

  test("should render correct initial state", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <TextNoteFormModal {...props} />
      </Provider>
    );

    if (wrapper) {
      triggerInputChange(wrapper, { name: "content" }, "text", {
        tag: "textarea"
      });

      expect(wrapper.find("textarea[name='content']").props().value).toBe(
        "text"
      );
    }
  });

  test("should render form for an existing note in TextNoteFormModal correctly", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <TextNoteFormModal
          history={{
            ...props.history,
            location: { pathname: "pathname", search: "?text=1" } as any
          }}
        />
      </Provider>
    );
    if (wrapper) {
      expect(wrapper.find("textarea[name='content']").props().value).toBe(
        "text"
      );
    }
  });
});

describe("Canceling", () => {
  test("should close TextNoteFormModal correctly", () => {
    if (wrapper) {
      expect(wrapper.find(".ReactModal__Overlay").exists());
      wrapper.find(".ReactModal__Overlay").simulate("click");
      expect(mockHistoryPush).toHaveBeenLastCalledWith("/dashboard");
    }
  });
});
