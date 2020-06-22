import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Props, UserFormModal } from "../UserFormModal";
import { defaultAuthState } from "../../../actions/__tests__/auth.test";
import { triggerInputChange } from "../../../common/testUtils";
import { user } from "../../../testData/users";

let wrapper: ReactWrapper, props: Props;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?user=edit",
  },
};

beforeEach(() => {
  props = {
    updateUserData: jest.fn(),
    history: history as any,
    auth: { ...defaultAuthState.auth },
  };
  wrapper = mount(<UserFormModal {...props} />);
});

describe("Rendering", () => {
  test("should render LoginPage correctly", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

describe("Submitting", () => {
  test("should update user details", () => {
    window.URL.createObjectURL = jest.fn();
    const photoFile = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    expect(wrapper.exists(".user-form")).toBeTruthy();

    // set values
    triggerInputChange(wrapper, { name: "firstName" }, "test");
    triggerInputChange(wrapper, { name: "lastName" }, "test");
    wrapper
      .find("#avatar")
      .hostNodes()
      .simulate("change", { target: { files: [photoFile] } });

    // submit form
    wrapper.find("form").simulate("focus").simulate("submit");
    expect(props.updateUserData).toHaveBeenLastCalledWith({
      displayName: "test test",
      photoFile,
      photoURL: null,
      tenantId: user.uid,
    });
  });
});

describe("Canceling", () => {
  test("should close the modal by clicking on react modal overlay", () => {
    expect(wrapper.exists(".user-form")).toBeTruthy();
    expect(wrapper.find(".ReactModal__Overlay").exists()).toBeTruthy();
    wrapper.find(".ReactModal__Overlay").simulate("click");
    expect(mockHistoryPush).toHaveBeenLastCalledWith("/dashboard");
  });
});
