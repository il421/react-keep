import React from "react";
import { connect } from "react-redux";

import { Store, TagsStoreState } from "../../store/store.types";

interface NoteTagProps {
  tagId: string;
}

interface StateProps {
  tags: TagsStoreState[];
}

export type Props = NoteTagProps & StateProps;

export const NoteTagBase: React.FunctionComponent<Props> = ({
  tagId,
  tags
}): JSX.Element => {
  const getTagById = (tagId: string): string | undefined => {
    const tag = tags.find(t => t.id === tagId);
    return tag ? tag.value : undefined;
  };

  return <div className="note__tag">{getTagById(tagId)}</div>;
};

const mapStateToProps = (state: Store): StateProps => {
  return {
    tags: state.tags
  };
};

export const NoteTag = connect<StateProps, {}, NoteTagProps, Store>(
  mapStateToProps
)(NoteTagBase);
