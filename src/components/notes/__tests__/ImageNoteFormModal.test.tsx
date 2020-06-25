import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  ImageNoteFormModalProps,
  ImageNoteFormModal,
  getValidationErrors,
} from "../ImageNoteFormModal";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ImageItem, Store } from "../../../store/store.types";
import { notes } from "../../../testData/notes";
import { tags } from "../../../testData/tags";
import { ValidationErrors } from "final-form";
import { Errors } from "../../../common";

let wrapper: ReactWrapper | undefined, props: ImageNoteFormModalProps;
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
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render ImageNoteFormModal correctly", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
        <ImageNoteFormModal {...props} />
      </Provider>
    );

    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });

  test("should render new form in ImageNoteFormModal correctly", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
        <ImageNoteFormModal {...props} />
      </Provider>
    );
    if (wrapper) {
      expect(wrapper.find("input[name='title']").props().value).toBe("");
      expect(wrapper.find(".image-note-form-item__img").props().src).toBe(
        "img/no_image.png"
      );
      expect(wrapper.find("textarea[name='content.text']").props().value).toBe(
        ""
      );
    }
  });

  test("should render form for an existing note in ImageNoteFormModal correctly + delete imageUrl", () => {
    wrapper = mount(
      <Provider store={createMockStore({ notes: notes, tags: tags } as Store)}>
        <ImageNoteFormModal
          history={{
            ...props.history,
            location: { pathname: "pathname", search: "?image=3" } as any,
          }}
        />
      </Provider>
    );
    if (wrapper) {
      expect(wrapper.find("input[name='title']").props().value).toBe(
        notes[2].title
      );
      expect(wrapper.find(".image-note-form-item__img").props().src).toBe(
        (notes[2].content as ImageItem).imageUrl
      );
      expect(wrapper.find("textarea[name='content.text']").props().value).toBe(
        (notes[2].content as ImageItem).text
      );

      // delete the imageUrl
      expect(wrapper.find("#test-trash-image-button").exists()).toBeTruthy();
      wrapper.find("#test-trash-image-button").hostNodes().simulate("click");

      expect(wrapper.find(".image-note-form-item__img").props().src).toBe(
        "img/no_image.png"
      );
    }
  });
});

describe("Canceling", () => {
  test("should close ImageNoteFormModal correctly", () => {
    if (wrapper) {
      expect(wrapper.find(".ReactModal__Overlay").exists());
      wrapper.find(".ReactModal__Overlay").simulate("click");
      expect(mockHistoryPush).toHaveBeenLastCalledWith("/dashboard");
    }
  });
});

describe("Validation", () => {
  test("should return no errors", () => {
    const photoFile = new File(["(⌐□_□)"], "test.png", { type: "image/png" });

    const noErrors: ValidationErrors = getValidationErrors({
      content: { uploadedImage: photoFile, imageUrl: null, text: "text" },
    });
    expect(Object.keys(noErrors.content).length).toBe(0);
  });

  test("should return no errors if imageUrl", () => {
    const noErrors: ValidationErrors = getValidationErrors({
      content: { uploadedImage: undefined, imageUrl: "imageUrl", text: "text" },
    });
    expect(Object.keys(noErrors.content).length).toBe(0);
  });

  test("should return uploadedImage required", () => {
    const emailIsRequiredError: ValidationErrors = getValidationErrors({
      content: { uploadedImage: undefined, imageUrl: null, text: "text" },
    });
    expect(Object.keys(emailIsRequiredError).length).toBe(1);
    expect(emailIsRequiredError.content.uploadedImage).toBe(Errors.required);
  });
});
