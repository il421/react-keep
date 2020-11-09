import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ListNoteFromItemProps, ListNoteFromItem } from "../ListNoteFromItem";
import { Form } from "react-final-form";
import { triggerCheckboxChange } from "../../../common/testUtils";

let wrapper: ReactWrapper | undefined, props: ListNoteFromItemProps;

beforeEach(() => {
  props = {
    name: "text",
    index: 1,
    addItem: jest.fn(),
    onRemove: jest.fn(),
    onChecked: jest.fn(),
    setPastedValue: jest.fn(),
    isChecked: false,
    autoFocus: false,
  };

  wrapper = mount(
    <Form initialValues={{}} onSubmit={() => {}}>
      {() => <ListNoteFromItem {...props} />}
    </Form>
  );
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render ListNoteFormItem correctly", () => {
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Actions", () => {
  test("should call onRemove then click on a remove button", () => {
    wrapper = mount(
      <Form initialValues={{}} onSubmit={() => {}}>
        {() => <ListNoteFromItem {...props} />}
      </Form>
    );

    // remove item
    wrapper.find("#test-item-rm-button-1").hostNodes().simulate("click");
    expect(props.onRemove).toBeCalled();
  });

  test("should call onChecked then click on a remove button", () => {
    wrapper = mount(
      <Form initialValues={{}} onSubmit={() => {}}>
        {() => <ListNoteFromItem {...props} />}
      </Form>
    );

    // check item
    triggerCheckboxChange(wrapper, { name: "text.checked" }, true);
    expect(props.onChecked).toHaveBeenLastCalledWith(true, {
      text: { checked: true },
    });
  });
});
