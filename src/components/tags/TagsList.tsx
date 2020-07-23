import React from "react";
import { FlexBox } from "../ui-components";
import { JustifyContent } from "../../common";
import {
  FiltersStoreState,
  Store,
  TagsStoreState,
} from "../../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import TagsItem from "./TagsItem";
import { handleRemoveTag } from "../../actions/tags";
import { setTagsFilter } from "../../actions/filters";
import { removeTagFromNotes } from "../../actions/notes";
import "../../styles/components/tags/_tags-list.scss";

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

export class TagsListBase extends React.PureComponent<Props> {
  render() {
    return (
      <FlexBox
        vertical
        justifyContent={JustifyContent.start}
        className="tags-list"
      >
        {this.props.tags.map((tag) => (
          <TagsItem
            key={tag.id}
            tag={tag}
            removeTag={(id: string) => {
              this.props.removeTag(id);
              this.props.removeTagFromNotes(id);
            }}
            checked={this.props.filters.tagFilters.includes(tag.id)}
            onChange={this.props.toggleTag}
          />
        ))}
      </FlexBox>
    );
  }
}

const mapStateToProps = (state: Store): StateProps => {
  return {
    tags: state.tags,
    filters: state.filters,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  removeTag: (id: string) => dispatch(handleRemoveTag(id)),
  toggleTag: (id: string) => dispatch(setTagsFilter(id)),
  removeTagFromNotes: (id: string) => dispatch(removeTagFromNotes(id)),
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
