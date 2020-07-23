import React from "react";
import CollaboratorForm from "./CollaboratorForm";
import { CollaboratorsList } from "./CollaboratorsList";

interface CollaboratorsProps {}

export class Collaborators extends React.PureComponent<CollaboratorsProps> {
  render() {
    return (
      <>
        <CollaboratorForm />
        <CollaboratorsList />
      </>
    );
  }
}
