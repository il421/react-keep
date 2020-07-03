import React from "react";
import Modal from "react-modal";
import { ListItem } from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { PathNames, QueryKeys, RouteActions } from "../../routers/Routing";
import { NoteForm } from "./NoteForm";
import { History } from "history";
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays";

import { ListNoteFromItem } from "./ListNoteFromItem";
import { FormRenderProps, FormSpy } from "react-final-form";
import { IconButton, FlexBox } from "../ui-components";
import { AlignItems, JustifyContent } from "../../common";
import { getDefaultContent } from "./utils";
import { isModal, nameOf } from "../../common";
import { parse } from "query-string";

export interface ListNoteFormModalProps {
  history: History;
}

export class ListNoteFormModal extends React.Component<ListNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<ListItem[]>>();

  private getCheckedItems = (content: ListItem[]): string => {
    if (!content) return "";
    return `${content.length}/${content.filter((c) => c.checked).length}`;
  };

  private isNewNote: boolean =
    parse(this.props.history.location.search)[QueryKeys.list] ===
    RouteActions.add;

  render() {
    if (
      !isModal({
        query: this.props.history.location.search,
        type: QueryKeys.list,
      })
    ) {
      return null;
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.history.push(PathNames.base)}
        closeTimeoutMS={200}
        className="note-modal"
        ariaHideApp={false}
      >
        <NoteForm type={NoteType.list} history={this.props.history}>
          <>
            <FormSpy>
              {({
                form,
                values,
              }: FormRenderProps<NoteFormValues<ListItem[]>>) => {
                return (
                  <FlexBox
                    justifyContent={JustifyContent.spaceBetween}
                    alignItems={AlignItems.center}
                  >
                    <div id="test-checked-items">
                      Checked: {this.getCheckedItems(values.content)}
                    </div>
                    <IconButton
                      onButtonClick={() =>
                        form.change(this.nameOf("content"), [
                          (getDefaultContent(NoteType.list) as ListItem[])[0],
                          ...values.content,
                        ])
                      }
                      icon="plus-circle"
                      text="Add line"
                      id="test-add-item-button"
                    />
                  </FlexBox>
                );
              }}
            </FormSpy>
          </>
          <div className="note-form__list">
            <FieldArray name={this.nameOf("content")}>
              {(
                props: FieldArrayRenderProps<ListItem, HTMLElement> & {
                  fields: {
                    sortArray: (compareFn: (a: any, b: any) => number) => void;
                  };
                }
              ) => {
                return props.fields.map((name: string, index: number) => (
                  <ListNoteFromItem
                    autoFocus={this.isNewNote && index === 0}
                    name={name}
                    key={props.fields.length! - index} // to focus the first element
                    index={index}
                    onRemove={() => props.fields.remove(index)}
                    onChecked={() => {
                      props.fields.sortArray(
                        (a: ListItem, b: ListItem) =>
                          Number(a.checked) - Number(b.checked)
                      );
                    }}
                  />
                ));
              }}
            </FieldArray>
          </div>
        </NoteForm>
      </Modal>
    );
  }
}
