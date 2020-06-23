import React from "react";

interface UserPhotoProps
  extends Pick<HTMLImageElement, "src" | "width" | "height"> {
  className?: string;
}

export class UserPhoto extends React.PureComponent<UserPhotoProps> {
  render() {
    const { className, ...rest } = this.props;
    return (
      <div className={className}>
        <img {...rest} alt="User photo" />
      </div>
    );
  }
}
