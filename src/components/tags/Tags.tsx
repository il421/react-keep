import React, { FunctionComponent } from "react";

import { TagForm } from "./TagForm";
import { TagsList } from "./TagsList";

export const Tags: FunctionComponent = () => {
  return (
    <>
      <TagForm />
      <TagsList />
    </>
  );
};
