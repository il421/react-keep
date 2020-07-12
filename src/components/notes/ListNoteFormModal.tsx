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
import { FlexBox, IconButton } from "../ui-components";
import {
  AlignItems,
  isModal,
  JustifyContent,
  nameOf,
  newLineRegEx,
} from "../../common";
import { getDefaultContent } from "./utils";
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
          <FormSpy>
            {({
              form,
              values,
            }: FormRenderProps<NoteFormValues<ListItem[]>>) => {
              const addItem = () => {
                form.change(this.nameOf("content"), [
                  getDefaultContent<ListItem[]>(NoteType.list)[0],
                  ...values.content,
                ]);
              };
              return (
                <>
                  <FlexBox
                    justifyContent={JustifyContent.spaceBetween}
                    alignItems={AlignItems.center}
                  >
                    <div id="test-checked-items">
                      Checked: {this.getCheckedItems(values.content)}
                    </div>
                    <IconButton
                      onButtonClick={addItem}
                      icon="plus-circle"
                      text="Add line"
                      id="test-add-item-button"
                    />
                  </FlexBox>

                  <div className="note-form__list">
                    <FieldArray name={this.nameOf("content")}>
                      {(
                        props: FieldArrayRenderProps<ListItem, HTMLElement> & {
                          fields: {
                            sortArray: (
                              compareFn: (a: any, b: any) => number
                            ) => void;
                          };
                        }
                      ) => {
                        const handleOnChecked = () => {
                          props.fields.sortArray(
                            (a: ListItem, b: ListItem) =>
                              Number(a.checked) - Number(b.checked)
                          );
                        };

                        const handleOnRemove = (index: number) => () => {
                          props.fields.remove(index);
                        };

                        const setPastedValue = (index: number) => (
                          paste: string
                        ) => {
                          const values: string[] = paste
                            .split(newLineRegEx)
                            .filter((v) => !!v);

                          if (values.length > 1) {
                            const defaultItem: ListItem = getDefaultContent<
                              ListItem[]
                            >(NoteType.list)[0];
                            form.batch(() => {
                              for (let i = 0; i < values.length; i++) {
                                if (i === 0) {
                                  // update the first element
                                  props.fields.update(index, {
                                    ...defaultItem,
                                    content: values[i].trim(),
                                  });
                                } else {
                                  // push others
                                  props.fields.push({
                                    ...defaultItem,
                                    content: values[i].trim(),
                                  });
                                }
                              }
                            });
                          }
                        };

                        return props.fields.map(
                          (name: string, index: number) => (
                            <ListNoteFromItem
                              autoFocus={this.isNewNote && index === 0}
                              name={name}
                              key={props.fields.length! - index} // to focus the first element
                              index={index}
                              onRemove={handleOnRemove(index)}
                              addItem={addItem}
                              onChecked={handleOnChecked}
                              setPastedValue={setPastedValue(index)}
                            />
                          )
                        );
                      }}
                    </FieldArray>
                  </div>
                </>
              );
            }}
          </FormSpy>
        </NoteForm>
      </Modal>
    );
  }
}
