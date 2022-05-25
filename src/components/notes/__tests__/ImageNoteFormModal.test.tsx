import { ReactWrapper } from "enzyme";
import { ValidationErrors } from "final-form";
import fs from "fs";
import * as React from "react";

import { Errors } from "../../../common";
import { mountInApp } from "../../../common/testUtils";
import { ImageItem } from "../../../store/store.types";
import { notes } from "../../../testData/notes";
import {
  ImageNoteFormModalProps,
  ImageNoteFormModal,
  getValidationErrors
} from "../ImageNoteFormModal";

let wrapper: ReactWrapper | undefined, props: ImageNoteFormModalProps;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?image=add"
  }
};

const file = fs.readFileSync("./src/testData/test_img.jpg");

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
  test("should render ImageNoteFormModal correctly", () => {
    wrapper = mountInApp(<ImageNoteFormModal {...props} />);

    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });

  test("should render new form in ImageNoteFormModal correctly", () => {
    wrapper = mountInApp(<ImageNoteFormModal {...props} />);
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
    wrapper = mountInApp(
      <ImageNoteFormModal
        history={{
          ...props.history,
          location: { pathname: "pathname", search: "?image=3" } as any
        }}
      />
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
    const uploadedImage = new File([file], "test.png", { type: "image/png" });

    const noErrors: ValidationErrors = getValidationErrors({
      content: {
        uploadedImage,
        imageId: null,
        imageUrl: null,
        text: "text"
      }
    });
    expect(Object.keys(noErrors.content).length).toBe(0);
  });

  test("should return no errors if imageUrl", () => {
    const noErrors: ValidationErrors = getValidationErrors({
      content: {
        uploadedImage: undefined,
        imageUrl: "imageUrl",
        imageId: "imageId",
        text: "text"
      }
    });
    expect(Object.keys(noErrors.content).length).toBe(0);
  });

  test("should return uploadedImage required", () => {
    const emailIsRequiredError: ValidationErrors = getValidationErrors({
      content: {
        uploadedImage: undefined,
        imageUrl: null,
        imageId: null,
        text: "text"
      }
    });
    expect(Object.keys(emailIsRequiredError).length).toBe(1);
    expect(emailIsRequiredError.content.uploadedImage).toBe(Errors.required);
  });
});
