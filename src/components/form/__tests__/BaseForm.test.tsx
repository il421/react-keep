import React from "react";
import { shallow, mount, ShallowWrapper } from "enzyme";
import { BaseForm, BaseFormProps } from "../BaseForm";
import { notes } from "../../../testData/notes";
import { NoteFormValues, NoteType } from "../../notes/notes.types";
import { getInitialNoteFormValues } from "../../notes/utils";
import { PickerColors } from "../../../common/variables";
import { BaseFormOptions } from "../BaseForm.types";

let props: BaseFormProps<NoteFormValues<string>>,
  wrapper: ShallowWrapper<BaseFormProps<NoteFormValues<string>>, any>;
const defaultNote: NoteFormValues<string> = {
  type: NoteType.text,
  title: "",
  content: "",
  tags: [],
  color: PickerColors.white,
  currentOption: BaseFormOptions.none,
};

beforeEach(() => {
  props = {
    initialValues: getInitialNoteFormValues({
      type: NoteType.text,
      currentNote: notes[0],
      defaultValues: defaultNote,
    }),
    onSubmit: jest.fn(),
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
    ShallowWrapper<BaseFormProps<NoteFormValues<string>>, any>
  >(<BaseForm {...props} />);
  expect(mountedForm.exists(".note-form")).toBeTruthy();
  mountedForm.find("form").simulate("focus").simulate("submit");
  expect(props.onSubmit).toHaveBeenLastCalledWith(
    props.initialValues,
    expect.anything(), // formApi
    expect.anything() // options callback
  );
});
