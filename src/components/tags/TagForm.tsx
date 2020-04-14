import React from "react";
import { Store, TagsStoreState } from "../../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { BaseForm } from "../form/BaseForm";
import { TextInputField } from "../form/TextInputField";
import { Placeholders, nameOf } from "../../common";
import { handleAddTag } from "../../actions/tags";
import "../../styles/components/tags/_tags-form.scss";
import { IconButton } from "../ui-components/IconButton";
import { ValidationErrors } from "final-form";
import { Errors } from "../../common/validationErrors";

interface TagFormProps {}

interface StateProps {
  tags: TagsStoreState[];
}

interface DispatchProps {
  addTag: (value: string) => void;
}
type Props = TagFormProps & DispatchProps & StateProps;

interface TagFormValues {
  value: string | undefined;
}

class TagForm extends React.PureComponent<Props> {
  private nameOf = nameOf<TagFormValues>();

  private getValidationErrors = (values: TagFormValues): ValidationErrors => {
    const errors: ValidationErrors = {};
    const { value } = values;

    if (value && value.length === 0) {
      errors.value = Errors.required;
    } else if (value && value.length > 20) {
      errors.value = Errors.tag;
    }

    return errors;
  };

  render() {
    return (
      <BaseForm<TagFormValues>
        initialValues={{ value: undefined }}
        onSubmit={(values: TagFormValues) =>
          values.value && this.props.addTag(values.value)
        }
        onCancel={() => {}}
        classNames={{
          form: "tags-form",
        }}
        validate={this.getValidationErrors}
        resetAfterSubmitting={true}
        getButtons={(isDisable: boolean) => (
          <IconButton
            className="tags-form__submit"
            icon="plus-circle"
            size="1x"
            type="submit"
            disabled={isDisable}
          />
        )}
      >
        <TextInputField
          name={this.nameOf("value")}
          type="text"
          placeholder={Placeholders.newTag}
          className="tags-form__field"
        />
      </BaseForm>
    );
  }
}

const mapStateToProps = (state: Store): StateProps => {
  return {
    tags: state.tags,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  addTag: (value: string) => dispatch(handleAddTag(value)),
});

export default connect<StateProps, DispatchProps, TagFormProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(TagForm);
