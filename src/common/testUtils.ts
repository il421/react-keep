import { ReactWrapper } from "enzyme";

export const triggerInputChange = (
  wrapper: ReactWrapper,
  { name }: { name: string },
  value: string,
  options: {
    triggerBlur?: boolean;
    triggerFocus?: boolean;
  } = {
    triggerBlur: true,
    triggerFocus: true,
  }
) => {
  const input = wrapper.find("input[name='" + name + "']");
  if (options && options.triggerFocus) {
    input.simulate("focus");
  }

  input.simulate("change", { target: { value: value.toString() } });

  if (options && options.triggerBlur) {
    input.simulate("blur");
  }
};

export const triggerCheckboxChange = (
  wrapper: ReactWrapper,
  { name }: { name: string },
  checked: boolean
) => {
  const input = wrapper.find("input[type='checkbox'][name='" + name + "']");

  input.simulate("change", { target: { value: checked } });
};
