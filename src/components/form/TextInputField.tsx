import * as React from "react";
import { Field } from "react-final-form";
import TextareaAutosize from "react-textarea-autosize";

import { NEW_LINE_REG_EX } from "../../common";
import { ExposedFieldProps, FieldAdapterProps } from "./BaseForm.types";

const FieldAdapter: React.FunctionComponent<FieldAdapterProps> = ({
  className,
  autoFocus = false,
  input,
  meta,
  isTextArea = false,
  afterPasteCallback,
  onPaste,
  ...rest
}) => {
  const handleOnChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!afterPasteCallback) {
      input.onChange(event);
      return;
    }

    const isInsertFromPasteNativeEvent =
      (event.nativeEvent as InputEvent).inputType === "insertFromPaste";

    const value: string = event.currentTarget.value;
    const match: RegExpExecArray | null = NEW_LINE_REG_EX.exec(value);

    if (!match) {
      input.onChange(event);
    } else {
      // prevent change if value has new line in the end or beginning, but evoke a callback
      if (match.index === 0 || match.index === value.length - 1) {
        afterPasteCallback();
      } else {
        // prevent onChange of the value is pasted and has new lines
        !isInsertFromPasteNativeEvent && input.onChange(event);
      }
    }
  };

  return (
    <div className={className}>
      {isTextArea ? (
        <TextareaAutosize
          {...input}
          {...rest}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          onChange={handleOnChange}
          onPaste={onPaste}
          spellCheck="false"
          autoComplete="new-password"
          autoFocus={autoFocus}
        />
      ) : (
        <input
          {...input}
          {...rest}
          onInput={handleOnChange}
          onPaste={onPaste}
          autoComplete="new-password"
          autoFocus={autoFocus}
        />
      )}
      {(meta.error || meta.submitError) && meta.touched && (
        <span id={`error-message-${input.name}`}>{meta.error}</span>
      )}
    </div>
  );
};

export interface TextInputFieldProps
  extends ExposedFieldProps<string, HTMLElement> {
  type?: string;
  placeholder?: string;
  className: string;
  isTextArea?: boolean;
  autoFocus?: boolean;
  afterPasteCallback?: () => void;
  onPaste?: (
    event: React.ClipboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
export const TextInputField: React.FunctionComponent<TextInputFieldProps> = props => (
  <Field
    {...props}
    name={props.name}
    component={FieldAdapter}
    parse={(value: string) => value ?? ""}
  />
);
