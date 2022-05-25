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
  ListNoteFormModalProps,
  ListNoteFormModal
} from "../ListNoteFormModal";

let wrapper: ReactWrapper | undefined, props: ListNoteFormModalProps;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?list=add"
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
  test("should render ListNoteFormModal correctly", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <ListNoteFormModal {...props} />
      </Provider>
    );

    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });

  test("should render correct initial state", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <ListNoteFormModal {...props} />
      </Provider>
    );

    if (wrapper) {
      // one line
      const numberOfItems: number = 1;
      const checkedItems: number = 0;
      expect(wrapper.find("FieldArray").children().length).toBe(numberOfItems);
      expect(wrapper.find("#test-checked-items").text()).toBe(
        `Checked: ${numberOfItems}/${checkedItems}`
      );
    }
  });

  test("should add, remove, and check items", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <ListNoteFormModal {...props} />
      </Provider>
    );

    if (wrapper) {
      expect(
        wrapper.find("#test-add-item-button").hostNodes().simulate("click")
      );
      // add line
      let numberOfItems: number = 2;
      let checkedItems: number = 0;
      expect(wrapper.find("FieldArray").children().length).toBe(numberOfItems);
      expect(wrapper.find("#test-checked-items").text()).toBe(
        `Checked: ${numberOfItems}/${checkedItems}`
      );

      // input value and check items
      checkedItems = 1;
      expect(wrapper.find("FieldArray").children().length).toBe(numberOfItems);
      triggerInputChange(wrapper, { name: "content[0].content" }, "text", {
        tag: "textarea"
      });

      triggerCheckboxChange(wrapper, { name: "content[0].checked" }, true);
      expect(wrapper.find("#test-checked-items").text()).toBe(
        `Checked: ${numberOfItems}/${checkedItems}`
      );

      // remove items
      checkedItems = 0;
      numberOfItems = 0;
      wrapper.find("#test-item-rm-button-0").hostNodes().simulate("click");
      wrapper.find("#test-item-rm-button-0").hostNodes().simulate("click");

      expect(wrapper.find("FieldArray").children().length).toBe(numberOfItems);
      expect(wrapper.find("#test-checked-items").text()).toBe(
        `Checked: ${numberOfItems}/${checkedItems}`
      );
    }
  });

  test("should render form for an existing note in ListNoteFormModal correctly", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes, tags } as Store)}>
        <ListNoteFormModal
          history={{
            ...props.history,
            location: { pathname: "pathname", search: "?list=2" } as any
          }}
        />
      </Provider>
    );
    if (wrapper) {
      const numberOfItems = (notes[1].content as ListItem[]).length;
      expect(wrapper.find("FieldArray").children().length).toBe(numberOfItems);
    }
  });
});

describe("Canceling", () => {
  test("should close ListNoteFormModal correctly", () => {
    if (wrapper) {
      expect(wrapper.find(".ReactModal__Overlay").exists());
      wrapper.find(".ReactModal__Overlay").simulate("click");
      expect(mockHistoryPush).toHaveBeenLastCalledWith("/dashboard");
    }
  });
});
