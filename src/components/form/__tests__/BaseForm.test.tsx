import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { BaseForm, BaseFormProps } from "../BaseForm";
import { notes } from "../../../testData/notes";
import {
  NoteFormValues,
  NoteType,
  getInitialNoteFormValues,
} from "../../notes";
import { PickerColors } from "../../../common";

let props: BaseFormProps<NoteFormValues<string>>,
  wrapper: ShallowWrapper<BaseFormProps<NoteFormValues<string>>, any>;
const defaultNote: NoteFormValues<string> = {
  type: NoteType.text,
  title: "",
  content: "",
  tags: [],
  color: PickerColors.white,
};

beforeEach(() => {
  props = {
    initialValues: getInitialNoteFormValues({
      type: NoteType.text,
      currentNote: notes[0],
      defaultValues: defaultNote,
    }),
    onSubmit: jest.fn(),
    formClassName: "formClassName",
    getFormActions: jest.fn()
  };

  wrapper = shallow<BaseFormProps<NoteFormValues<string>>>(
    <BaseForm {...props} />
  );
});

test("should render BaseForm", () => {
  expect(wrapper.debug()).toMatchSnapshot();
});

test("should submit form", () => {
  const mountedForm = mount<
    ReactWrapper<BaseFormProps<NoteFormValues<string>>, any>
  >(<BaseForm {...props} />);
  expect(mountedForm.exists(".formClassName")).toBeTruthy();
  mountedForm.find("form").simulate("focus").simulate("submit");
  expect(props.onSubmit).toHaveBeenLastCalledWith(
    props.initialValues,
    expect.anything(), // formApi
    expect.anything() // options callback
  );
});
