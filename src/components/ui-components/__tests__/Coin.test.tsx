import { shallow, ShallowWrapper } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";

import { user } from "../../../testData/users";
import { Coin, CoinBaseProps } from "../Coin";

let props: CoinBaseProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    url: "url",
    name: user.firstName,
    email: user.email
  };
});

test("should render Coin", () => {
  wrapper = shallow(<Coin {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
