import React from "react";

export interface UserPhotoProps
  extends Pick<HTMLImageElement, "src" | "width" | "height"> {
  className?: string;
}

export class UserPhoto extends React.PureComponent<UserPhotoProps> {
  render() {
    const { className, ...rest } = this.props;
    return (
      <div className={className}>
        <image {...rest} />
      </div>
    );
  }
}
