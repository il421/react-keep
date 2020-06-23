import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Controllers } from "../Controllers";

test("should render Controllers correctly", () => {
  const wrapper: ShallowWrapper<typeof Controllers> = shallow<
    typeof Controllers
  >(<Controllers openDialog={jest.fn} />);
  expect(wrapper.debug()).toMatchSnapshot();
});
