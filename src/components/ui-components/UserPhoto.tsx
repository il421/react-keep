import React, { FunctionComponent } from "react";

export interface UserPhotoProps
  extends Pick<HTMLImageElement, "src" | "width" | "height"> {
  className?: string;
}

export const UserPhoto: FunctionComponent<UserPhotoProps> = ({
  className,
  ...rest
}) => {
  return (
    <div className={className}>
      <img {...rest} alt="User photo" />
    </div>
  );
};
