import * as React from "react";
import { RingLoader } from "react-spinners";
import { AlignItems, Colors, JustifyContent } from "../../common";
import "../../styles/components/login/_loading-page.scss";
import { FlexBox } from "../ui-components";

const LoadingPage = (): JSX.Element => (
  <FlexBox
    vertical={true}
    alignItems={AlignItems.center}
    justifyContent={JustifyContent.center}
    className="loading-page"
  >
    <RingLoader size={100} color={Colors.fresh} loading={true} />
    <div>We are getting your important notes...</div>
  </FlexBox>
);

export default LoadingPage;
