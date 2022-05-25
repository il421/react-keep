import { FormState, getIn } from "final-form";
import React from "react";
import { FormSpy } from "react-final-form";

export interface FieldSpyProps<
  FieldValue = any,
  FormValues extends object = object
> {
  name: string;
  onChange: (value: FieldValue, values?: FormValues) => void;
}

export class FieldSpy<
  FieldValue = any,
  FormValues extends object = object
> extends React.PureComponent<
  FieldSpyProps<FieldValue, FormValues>,
  { previousValue?: any }
> {
  _isMounted = false;
  constructor(props: FieldSpyProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <FormSpy<FormValues>
        subscription={{ values: true, initialValues: true }}
        onChange={this.onFormChange}
      />
    );
  }

  private onFormChange = (formState: FormState<FormValues>) => {
    if (this._isMounted) {
      const value = getIn(formState.values, this.props.name);
      let previousValue = this.state.previousValue;
      if (!("previousValue" in this.state)) {
        previousValue = getIn(formState.initialValues, this.props.name);
      }

      if (value !== previousValue) {
        this.setState({ previousValue: value }, () =>
          this.props.onChange(value, formState.values)
        );
      }
    }
  };
}
