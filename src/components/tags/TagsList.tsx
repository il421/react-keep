import React from "react";
import { FlexBox } from "../ui-components/FlexBox";
import { JustifyContent } from "../../common/variables";
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

type Props = TagsListProps & DispatchProps & StateProps;

class TagsList extends React.PureComponent<Props> {
  render() {
    return (
      <FlexBox vertical justifyContent={JustifyContent.start}>
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

export default connect<StateProps, DispatchProps, TagsListProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(TagsList);
