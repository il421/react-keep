import React from "react";
import { FlexBox, IconButton } from "../ui-components";
import { AlignItems, JustifyContent } from "../../common";
import { Collaborator } from "../../store/store.types";
import "../../styles/components/collaborators/_collaborators-item.scss";

export interface CollaboratorsItemProps {
  collaborator: Collaborator;
  removeCollaborator: (id: string) => void;
}

export class CollaboratorsItem extends React.PureComponent<
  CollaboratorsItemProps
> {
  private handleRemove = (id: string) => () => {
    this.props.removeCollaborator(id);
  };
  render() {
    return (
      <FlexBox
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
        className="collaborators-item"
      >
        <FlexBox justifyContent={JustifyContent.start}>
          {this.props.collaborator.photoURL && (
            <img
              src={this.props.collaborator.photoURL}
              alt={`Photo of ${
                this.props.collaborator.displayName ??
                this.props.collaborator.email
              }`}
              width={25}
              height={25}
            />
          )}
          <div className="collaborators-item__value">
            {this.props.collaborator.displayName ??
              this.props.collaborator.email}
          </div>
        </FlexBox>

        <IconButton
          icon="times"
          onButtonClick={this.handleRemove(this.props.collaborator.uid)}
        />
      </FlexBox>
    );
  }
}
