import React from 'react';

export default class TagsSelection extends React.Component {

  handleInputChange = (evt) => {
    const { checked, value } = evt.target;
    this.props.handleInputChange(checked, value);
  }

  checkInputs = (tags, id) => {
    const isChecked = tags.some((tag) => tag.id === id);
    if (isChecked) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="tags-selection">
        <div className="tags-selection__options">
          {
            this.props.userTags.length > 0 && (
              this.props.userTags.map((tag, index) => (
                <div key={ index } className="tags-selection__option">
                  <input
                    ref={ tag.id + this.props.name }
                    id={ tag.id + this.props.name }
                    type="checkbox"
                    value={ tag.id }
                    onChange={ this.handleInputChange }
                    checked={ this.checkInputs(this.props.tags, tag.id) }
                  />
                  <label htmlFor={ tag.id + this.props.name } className={`option-${index}`} />
                  <div>{ tag.value }</div>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
}
