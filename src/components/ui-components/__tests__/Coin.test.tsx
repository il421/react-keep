import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Coin, CoinBaseProps } from "../Coin";
import toJson from "enzyme-to-json";
import { user } from "../../../testData/users";

let props: CoinBaseProps, wrapper: ShallowWrapper;

beforeEach(() => {
  props = {
    url: "url",
    name: user.firstName,
    email: user.email,
  };
});

test("should render Coin", () => {
  wrapper = shallow(<Coin {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
