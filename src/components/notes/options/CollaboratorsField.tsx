import React, { FunctionComponent } from "react";

import { FlexWrap, JustifyContent, nameOf } from "../../../common";
import { Collaborator, ImageItem, ListItem } from "../../../store/store.types";
import "../../../styles/components/notes/_collaborators-picker.scss";
import { CheckboxGroupField } from "../../form/CheckboxGroupField";
import { FlexBox, Option } from "../../ui-components";
import { NoteFormValues } from "../notes.types";

interface CollaboratorsFieldProps {
  collaborators: Collaborator[];
}
export const CollaboratorsField: FunctionComponent<CollaboratorsFieldProps> = ({
  collaborators
}) => {
  const nameOfField = nameOf<NoteFormValues<string | ListItem[] | ImageItem>>();
  const getOptions = (): Option[] => {
    return collaborators.map<Option>((coll: Collaborator) => ({
      id: coll.uid,
      value: coll.displayName ?? coll.email! ?? coll.uid
    }));
  };

  return (
    <FlexBox
      justifyContent={JustifyContent.spaceBetween}
      vertical
      className="collaborators-picker"
      flexWrap={FlexWrap.wrap}
    >
      <CheckboxGroupField
        name={nameOfField("collaborators")}
        options={getOptions()}
        classNames={{
          option: "collaborators-picker__wrapper",
          checkbox: "collaborators-picker__checkbox",
          label: "collaborators-picker__value"
        }}
      />
    </FlexBox>
  );
};
