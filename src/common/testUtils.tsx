import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { defaultAuthState } from "../actions/__tests__/auth.test";
import { Store } from "../store/store.types";
import { notes } from "../testData/notes";
import { tags } from "../testData/tags";
import { collaborators } from "../testData/users";
import { WithFontAwesome } from "./WithFontAwesome";

export function triggerInputChange(
  wrapper: ReactWrapper,
  { name }: { name: string },
  value: string,
  options: {
    triggerBlur?: boolean;
    triggerFocus?: boolean;
    tag?: "input" | "textarea";
  } = {
    triggerBlur: true,
    triggerFocus: true,
    tag: "input"
  }
) {
  const { tag = "input" } = options;
  const element = wrapper.find(`${tag}[name='${name}']`);

  if (options && options.triggerFocus) {
    element.simulate("focus");
  }

  element.simulate("change", { target: { value: value.toString() } });
  if (options && options.triggerBlur) {
    element.simulate("blur");
  }
}

export const triggerCheckboxChange = (
  wrapper: ReactWrapper,
  { name }: { name: string },
  checked: boolean
) => {
  const input = wrapper.find(`input[type='checkbox'][name='${name}']`);

  input.simulate("change", { target: { value: checked } });
};

export const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

const createMockStore = configureMockStore([thunk]);
export const mountInApp = (node: React.ReactNode) => {
  return mount(
    <WithFontAwesome>
      <Provider
        store={createMockStore({
          notes,
          tags,
          auth: defaultAuthState.auth,
          collaborators
        } as Store)}
      >
        {node}
      </Provider>
    </WithFontAwesome>
  );
};
