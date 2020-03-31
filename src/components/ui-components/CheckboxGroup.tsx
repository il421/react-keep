import React from "react";
import { JustifyContent } from "../../common/variables";
import { FlexBox } from "./FlexBox";
import "../../styles/ui-components/_login-button.scss";

interface Option {
  id: string;
  value: string;
}
export interface CheckboxGroupProps {
  options: Option[];
  selectedKeys: string[];
  onChange: (selectedKeys: string[]) => void;
  classNames?: {
    option?: string;
    checkbox?: string;
    label?: string;
  };
}

export class CheckboxGroup extends React.PureComponent<CheckboxGroupProps> {
  private handleOnChange = (selectedKey: string) => {
    let selectedKeys: string[] = this.props.selectedKeys || [];

    const isAlreadySelected = selectedKeys.includes(selectedKey);
    if (isAlreadySelected) {
      selectedKeys = selectedKeys.filter(x => x !== selectedKey);
    } else {
      selectedKeys = [...selectedKeys, selectedKey];
    }
    if (this.props.onChange) {
      this.props.onChange(selectedKeys);
    }
  };

  render() {
    const { options, classNames, selectedKeys } = this.props;

    return (
      <>
        {options.map((o: Option, index: number) => {
          const checked = selectedKeys.includes(o.id);

          return (
            <FlexBox
              key={index}
              justifyContent={JustifyContent.start}
              className={classNames?.option}
            >
              <div className={classNames?.checkbox}>
                <input
                  id={o.id}
                  value={o.id}
                  type="checkbox"
                  checked={checked}
                  onChange={() => this.handleOnChange(o.id)}
                />
                <label
                  htmlFor={o.id}
                  onClick={() => this.handleOnChange(o.id)}
                />
              </div>

              <span className={classNames?.label}>{o.value}</span>
            </FlexBox>
          );
        })}
      </>
    );
  }
}
