import React from "react";

import { AlignItems, JustifyContent } from "../../common";
import { Collaborator } from "../../store/store.types";
import "../../styles/components/collaborators/_collaborators-item.scss";
import { FlexBox, IconButton } from "../ui-components";
import { Coin } from "../ui-components/Coin";

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
            <Coin
              email={this.props.collaborator.email}
              name={this.props.collaborator.displayName}
              url={this.props.collaborator.photoURL}
            />
          )}
          <div className="collaborators-item__value">
            {this.props.collaborator.displayName ??
              this.props.collaborator.email ??
              this.props.collaborator.uid}
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
