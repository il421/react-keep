import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { DashboardPageBase } from "../DashboardPage";
import { createBrowserHistory, History } from "history";

export const history: History = createBrowserHistory();

test("should render DashboardPage correctly", () => {
  const wrapper: ShallowWrapper<typeof DashboardPageBase, any> = shallow<
    typeof DashboardPageBase
  >(<DashboardPageBase history={history} toggleCurrentNote={jest.fn()} />);
  expect(wrapper.debug()).toMatchSnapshot();
});
