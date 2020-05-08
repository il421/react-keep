import React from "react";
import Modal from "react-modal";
import { ListItem } from "../../store/store.types";
import { NoteFormValues, NoteType } from "./notes.types";
import { PathNames, QueryKeys } from "../../routers/Routing";
import NoteForm from "./NoteForm";
import { History } from "history";
import { FieldArray } from "react-final-form-arrays";

import { ListNoteFromItem } from "./ListNoteFromItem";
import { FormSpy } from "react-final-form";
import { IconButton } from "../ui-components/IconButton";
import { FormApi } from "final-form";
import { FlexBox } from "../ui-components/FlexBox";
import { AlignItems, JustifyContent } from "../../common/variables";
import { getDefaultContent } from "./utils";
import { isModal, nameOf } from "../../common/utils";

interface ListNoteFormModalProps {
  history: History;
}

interface FormSpyProps {
  form: FormApi;
  values: NoteFormValues<ListItem[]>;
}

class ListNoteFormModal extends React.Component<ListNoteFormModalProps> {
  private nameOf = nameOf<NoteFormValues<ListItem[]>>();

  private getCheckedItems = (content: ListItem[]) => {
    return `${content.length}/${content.filter((c) => c.checked).length}`;
  };

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
        <NoteForm type={NoteType.list}>
          <>
            <FormSpy>
              {({ form, values }: FormSpyProps) => {
                return (
                  <FlexBox
                    justifyContent={JustifyContent.spaceBetween}
                    alignItems={AlignItems.center}
                  >
                    <div>Checked: {this.getCheckedItems(values.content)}</div>
                    <IconButton
                      onButtonClick={() =>
                        form.change(this.nameOf("content"), [
                          getDefaultContent(NoteType.list)[0],
                          ...values.content,
                        ])
                      }
                      icon="plus-circle"
                      text="Add line"
                    />
                  </FlexBox>
                );
              }}
            </FormSpy>
          </>
          <FieldArray name={this.nameOf("content")}>
            {({ fields }) => {
              return fields.map((name, index) => (
                <ListNoteFromItem
                  name={name}
                  key={Math.random()}
                  onRemove={() => fields.remove(index)}
                  autoFocus={index === 0}
                />
              ));
            }}
          </FieldArray>
        </NoteForm>
      </Modal>
    );
  }
}

export default ListNoteFormModal;
