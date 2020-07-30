import React from "react";
import { FlexBox, Option } from "../../ui-components";
import { FlexWrap, JustifyContent, nameOf } from "../../../common";
import { Collaborator, ImageItem, ListItem } from "../../../store/store.types";
import "../../../styles/components/notes/_collaborators-picker.scss";
import { NoteFormValues } from "../notes.types";
import { CheckboxGroupField } from "../../form/CheckboxGroupField";

interface CollaboratorsFieldProps {
  collaborators: Collaborator[];
}
export class CollaboratorsField extends React.PureComponent<
  CollaboratorsFieldProps
> {
  private nameOf = nameOf<NoteFormValues<string | ListItem[] | ImageItem>>();
  private getOptions = (): Option[] => {
    return this.props.collaborators.map<Option>((coll: Collaborator) => ({
      id: coll.uid,
      value: coll.displayName ?? coll.email! ?? coll.uid,
    }));
  };

  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        vertical
        className="collaborators-picker"
        flexWrap={FlexWrap.wrap}
      >
        <CheckboxGroupField
          name={this.nameOf("collaborators")}
          options={this.getOptions()}
          classNames={{
            option: "collaborators-picker__wrapper",
            checkbox: "collaborators-picker__checkbox",
            label: "collaborators-picker__value",
          }}
        />
      </FlexBox>
    );
  }
}

export default CollaboratorsField;
