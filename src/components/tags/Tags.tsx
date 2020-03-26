import React from "react";
import "../../styles/components/tags/_tags.scss";
import { FlexBox } from "../ui-components/FlexBox";
import { JustifyContent } from "../../common/variables";
import TagForm from "./TagForm";
import TagsList from "./TagsList";

interface TagsProps {}

class Tags extends React.PureComponent<TagsProps> {
  render() {
    return (
      <>
        <FlexBox justifyContent={JustifyContent.spaceBetween}>
          <h2 className="tags__title">Tag List</h2>
        </FlexBox>
        <TagForm />
        <TagsList />
      </>
    );
  }
}

export default Tags;
