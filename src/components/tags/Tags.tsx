import React from "react";
import "../../styles/components/tags/_tags.scss";
import TagForm from "./TagForm";
import TagsList from "./TagsList";

interface TagsProps {}

class Tags extends React.PureComponent<TagsProps> {
  render() {
    return (
      <div className="tags">
        <TagForm />
        <TagsList />
      </div>
    );
  }
}

export default Tags;
