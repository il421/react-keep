import React from "react";
import { RingLoader } from "react-spinners";
import { Colors } from "../../common/variables";

const LoadingPage = (): JSX.Element => (
  <div className="loader">
    <RingLoader
      size={ 100 }
      color={Colors.fresh}
      loading={ true }
    />
  </div>
);

export default LoadingPage;
