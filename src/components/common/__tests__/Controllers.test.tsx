import React from "react";
import { shallow } from "enzyme";
import { Controllers } from "../Controllers";

test("should render Controllers correctly", () => {
  const wrapper: any = shallow<typeof Controllers>(
    <Controllers openDialog={jest.fn} />
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
