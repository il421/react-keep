import React from "react";
import { RingLoader } from "react-spinners";
import { AlignItems, Colors, JustifyContent } from "../../common/variables";
import "../../styles/components/login/_loading-page.scss";
import { FlexBox } from "../ui-components/FlexBox";

const LoadingPage = (): JSX.Element => (
  <FlexBox
    alignItems={AlignItems.center}
    justifyContent={JustifyContent.center}
    className="loading-page"
  >
    <RingLoader size={100} color={Colors.fresh} loading={true} />
  </FlexBox>
);

export default LoadingPage;
