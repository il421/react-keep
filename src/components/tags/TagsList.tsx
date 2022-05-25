import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { setTagsFilter } from "../../actions/filters";
import { removeTagFromNotes } from "../../actions/notes";
import { handleRemoveTag } from "../../actions/tags";
import { JustifyContent } from "../../common";
import {
  FiltersStoreState,
  Store,
  TagsStoreState
} from "../../store/store.types";
import "../../styles/components/tags/_tags-list.scss";
import { FlexBox } from "../ui-components";
import { TagsItem } from "./TagsItem";

interface TagsListProps {}

interface StateProps {
  tags: TagsStoreState[];
  filters: FiltersStoreState;
}

interface DispatchProps {
  removeTag: (id: string) => void;
  toggleTag: (id: string) => void;
  removeTagFromNotes: (id: string) => void;
}

export type Props = DispatchProps & StateProps;

const TagsListBase: FunctionComponent<Props> = ({
  tags,
  toggleTag,
  removeTag,
  filters,
  removeTagFromNotes
}) => {
  return (
    <FlexBox
      vertical
      justifyContent={JustifyContent.start}
      className="tags-list"
    >
      {tags.map(tag => (
        <TagsItem
          key={tag.id}
          tag={tag}
          removeTag={(id: string) => {
            removeTag(id);
            removeTagFromNotes(id);
          }}
          checked={filters.tagFilters.includes(tag.id)}
          onChange={toggleTag}
        />
      ))}
    </FlexBox>
  );
};

const mapStateToProps = (state: Store): StateProps => {
  return {
    tags: state.tags,
    filters: state.filters
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  removeTag: (id: string) => dispatch(handleRemoveTag(id)),
  toggleTag: (id: string) => dispatch(setTagsFilter(id)),
  removeTagFromNotes: (id: string) => dispatch(removeTagFromNotes(id))
});

export const TagsList = connect<
  StateProps,
  DispatchProps,
  TagsListProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(TagsListBase);
