import { ReactWrapper } from "enzyme";

export function triggerInputChange(
  wrapper: ReactWrapper,
  { name }: { name: string },
  value: string,
  options: {
    triggerBlur?: boolean;
    triggerFocus?: boolean;
    tag?: "input" | "textarea";
  } = {
    triggerBlur: true,
    triggerFocus: true,
    tag: "input",
  }
) {
  const { tag = "input" } = options;
  const element = wrapper.find(tag + "[name='" + name + "']");

  if (options && options.triggerFocus) {
    element.simulate("focus");
  }

  element.simulate("change", { target: { value: value.toString() } });
  if (options && options.triggerBlur) {
    element.simulate("blur");
  }
}

export const triggerCheckboxChange = (
  wrapper: ReactWrapper,
  { name }: { name: string },
  checked: boolean
) => {
  const input = wrapper.find("input[type='checkbox'][name='" + name + "']");

  input.simulate("change", { target: { value: checked } });
};
