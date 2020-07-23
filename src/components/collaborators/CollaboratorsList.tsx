import React from "react";
import { FlexBox } from "../ui-components";
import { JustifyContent } from "../../common";
import { CollaboratorsStoreState, Store } from "../../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { CollaboratorsItem } from "./CollaboratorsItem";
import { handleRemoveCollaborator } from "../../actions/collaborators";
import "../../styles/components/collaborators/_collaborators-list.scss";

interface TagsListProps {}

interface StateProps {
  collaborators: CollaboratorsStoreState[];
}

interface DispatchProps {
  removeCollaborator: (id: string) => void;
}

export type Props = DispatchProps & StateProps;

export class CollaboratorsListBase extends React.PureComponent<Props> {
  render() {
    return (
      <FlexBox
        vertical
        justifyContent={JustifyContent.start}
        className="collaborators-list"
      >
        {this.props.collaborators.map((coll) => (
          <CollaboratorsItem
            key={coll.uid}
            collaborator={coll}
            removeCollaborator={(id: string) => {
              this.props.removeCollaborator(id);
            }}
          />
        ))}
      </FlexBox>
    );
  }
}

const mapStateToProps = (state: Store): StateProps => {
  return {
    collaborators: state.collaborators,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  removeCollaborator: (id: string) => dispatch(handleRemoveCollaborator(id)),
});

export const CollaboratorsList = connect<
  StateProps,
  DispatchProps,
  TagsListProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(CollaboratorsListBase);
