import React from "react";
import { ReactWrapper } from "enzyme";
import { NoteFormBase, Props } from "../NoteForm";
import { Form } from "react-final-form";
import { notes } from "../../../testData/notes";
import { tags } from "../../../testData/tags";
import { NoteType } from "../notes.types";
import {
  flushPromises,
  mountInApp,
  triggerInputChange,
} from "../../../common/testUtils";
import { TextInputField } from "../../form";
import { PickerColors, Placeholders } from "../../../common";
import { act } from "react-dom/test-utils";
import { collaborators } from "../../../testData/users";

let wrapper: ReactWrapper | undefined, props: Props;
const mockHistoryPush = jest.fn();

const history = {
  push: mockHistoryPush,
  location: {
    pathname: "pathname",
    search: "?text=add",
  },
};
beforeEach(() => {
  props = {
    notes: notes,
    collaborators: collaborators,
    history: history as any,
    tags: tags,
    type: NoteType.text,
    addNote: jest.fn(),
    updateNote: jest.fn(),
  };
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }
});

describe("Rendering", () => {
  test("should render NoteForm correctly", () => {
    wrapper = mountInApp(
      <Form initialValues={{}} onSubmit={() => {}}>
        {() => (
          <NoteFormBase {...props}>
            <TextInputField
              isTextArea={true}
              name={"content"}
              placeholder={Placeholders.content}
              className="note-form__text"
            />
          </NoteFormBase>
        )}
      </Form>
    );
    if (wrapper) {
      expect(wrapper.debug()).toMatchSnapshot();
    }
  });
});

describe("Actions", () => {
  it("Should add a text note with values, a color, and tags", async () => {
    wrapper = mountInApp(
      <Form initialValues={{}} onSubmit={() => {}}>
        {() => (
          <NoteFormBase {...props}>
            <TextInputField
              isTextArea={true}
              name={"content"}
              placeholder={Placeholders.content}
              className="note-form__text"
            />
          </NoteFormBase>
        )}
      </Form>
    );

    await act(async () => {
      if (wrapper) {
        // check the initial state
        expect(
          wrapper.find("#test-base-form-submit-button").hostNodes().props()
            .disabled
        ).toBeTruthy();
        expect(
          wrapper.find(".note-modal__container").hostNodes().props().style!
            .backgroundColor
        ).toBe(PickerColors.white);

        // set value
        triggerInputChange(wrapper, { name: "title" }, notes[0].title);
        triggerInputChange(
          wrapper,
          { name: "content" },
          notes[0].content as string,
          {
            tag: "textarea",
          }
        );

        // change the color
        wrapper.find("#icon-palette").hostNodes().simulate("click");
        await flushPromises();
        wrapper.update();
        expect(wrapper.find(".colors-picker").exists()).toBeTruthy();
        wrapper
          .find(".colors-picker__item")
          .at(1)
          .find("input")
          .simulate("change");
        expect(
          wrapper.find(".note-modal__container").hostNodes().props().style!
            .backgroundColor
        ).toBe(PickerColors.red);

        // check tags
        wrapper.find("#icon-tags").hostNodes().simulate("click");
        await flushPromises();
        wrapper.update();
        wrapper
          .find(".tags-picker__checkbox")
          .at(0)
          .find("label")
          .simulate("click");
        await flushPromises();
        wrapper.update();
        wrapper
          .find(".tags-picker__checkbox")
          .at(1)
          .find("label")
          .simulate("click");
        await flushPromises();
        wrapper.update();

        // check collaborators
        wrapper.find("#icon-share").hostNodes().simulate("click");
        await flushPromises();
        wrapper.update();
        wrapper
          .find(".collaborators-picker__checkbox")
          .at(0)
          .find("label")
          .simulate("click");
        await flushPromises();
        wrapper.update();
        wrapper
          .find(".collaborators-picker__checkbox")
          .at(1)
          .find("label")
          .simulate("click");
        await flushPromises();
        wrapper.update();

        // submit the form
        expect(
          wrapper.find("#test-base-form-submit-button").hostNodes().props()
            .disabled
        ).toBeFalsy();
        wrapper
          .find("#test-base-form-submit-button")
          .hostNodes()
          .simulate("submit");
        await flushPromises();
        expect(props.addNote).toHaveBeenLastCalledWith({
          collaborators: collaborators.map((c) => c.uid),
          color: PickerColors.red,
          content: notes[0].content,
          tags: [tags[0].id, tags[1].id],
          title: notes[0].title,
          type: NoteType.text,
        });
      }
    });
  });

  it("Should update a text note with values, a color, and tags", async () => {
    wrapper = mountInApp(
      <Form initialValues={{}} onSubmit={() => {}}>
        {() => (
          <NoteFormBase
            {...props}
            history={
              {
                ...history,
                location: { ...history.location, search: "?text=4" },
              } as any
            }
          >
            <TextInputField
              isTextArea={true}
              name={"content"}
              placeholder={Placeholders.content}
              className="note-form__text"
            />
          </NoteFormBase>
        )}
      </Form>
    );

    await act(async () => {
      if (wrapper) {
        // check the initial state
        expect(
          wrapper.find("#test-base-form-submit-button").hostNodes().props()
            .disabled
        ).toBeTruthy();
        expect(
          wrapper.find(".note-modal__container").hostNodes().props().style!
            .backgroundColor
        ).toBe(notes[3].color);

        // set value
        triggerInputChange(
          wrapper,
          { name: "title" },
          `updated-${notes[3].title}`
        );
        await flushPromises();
        wrapper.update();

        // change the color
        wrapper.find("#icon-palette").hostNodes().simulate("click");
        await flushPromises();
        wrapper.update();
        expect(wrapper.find(".colors-picker").exists()).toBeTruthy();
        wrapper
          .find(".colors-picker__item")
          .at(2)
          .find("input")
          .simulate("change");
        expect(
          wrapper.find(".note-modal__container").hostNodes().props().style!
            .backgroundColor
        ).toBe(PickerColors.blue);

        // check tags
        wrapper.find("#icon-tags").hostNodes().simulate("click");
        await flushPromises();
        wrapper.update();
        wrapper
          .find(".tags-picker__checkbox")
          .at(0)
          .find("label")
          .simulate("click");
        await flushPromises();
        wrapper.update();

        // check collaborators
        wrapper.find("#icon-share").hostNodes().simulate("click");
        await flushPromises();
        wrapper.update();
        wrapper
          .find(".collaborators-picker__checkbox")
          .at(0)
          .find("label")
          .simulate("click");
        await flushPromises();
        wrapper.update();

        // submit the form
        expect(
          wrapper.find("#test-base-form-submit-button").hostNodes().props()
            .disabled
        ).toBeFalsy();
        wrapper
          .find("#test-base-form-submit-button")
          .hostNodes()
          .simulate("submit");
        await flushPromises();
        expect(props.updateNote).toHaveBeenLastCalledWith("4", {
          archive: false,
          important: false,
          id: notes[3].id,
          color: PickerColors.blue,
          content: notes[3].content,
          tags: [],
          title: `updated-${notes[3].title}`,
          type: NoteType.text,
          createdAt: notes[3].createdAt,
          updatedAt: expect.anything(),
          collaborators: [collaborators[0].uid],
        });
      }
    });
  });
});
