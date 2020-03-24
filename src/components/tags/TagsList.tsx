import React from "react";
import "../../styles/components/tags/_tags-list.scss";
import { FlexBox } from "../ui-components/FlexBox";
import { JustifyContent } from "../../common/variables";
import { Store, TagsStoreState, UpdateUser } from "../../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { updateUserData } from "../../actions/auth";
import { connect } from "react-redux";
import TagForm from "./TagForm";

interface TagsListProps {}

interface StateProps {
  tags: TagsStoreState[];
}

interface DispatchProps {
  updateUserData: (data: UpdateUser) => void;
}

type Props = TagsListProps & StateProps & DispatchProps;

class TagsList extends React.PureComponent<Props> {
  render() {
    return (
      <>
        <FlexBox justifyContent={JustifyContent.spaceBetween}>
          <h2 className="tags-list__title">Tag List</h2>
        </FlexBox>

        <FlexBox vertical justifyContent={JustifyContent.start}>
          {this.props.tags.map(tag => (
            <div key={tag.id}>{tag.value}</div>
          ))}
        </FlexBox>

        <TagForm tags={this.props.tags} />
      </>
    );
  }
}

const mapStateToProps = (state: Store): StateProps => {
  return {
    tags: state.tags
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  updateUserData: (data: UpdateUser) => dispatch(updateUserData(data))
});

export default connect<StateProps, DispatchProps, TagsListProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(TagsList);
