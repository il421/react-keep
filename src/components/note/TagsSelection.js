import React from 'react';

export default class TagsSelection extends React.Component {
  checked = [];

  // need to solve the problem with fetching checked, updating, removing tags
  componentDidMount() {
    for (let i = 0; i < this.props.tags.length; i++) {
      this.checked.push(false);
    }
  }

  handleInputChange = (id, index) => {
    this.checked[index] = !this.checked[index];
    this.props.handleInputChange(this.checked[index], id);
  }

  uncheckedAllInputs = () => {
    for (let i = 0; i < this.checked.length; i++) {
      this.checked[i] = false;
    }
  }

  render() {
    return (
      <div className="tags-selection">
        <div className="tags-selection__options">
          {
            this.props.tags.length > 0 && (
              this.props.tags.map((tag, index) => (
                <div key={ index } className="tags-selection__option">
                  <input
                    ref={ index + this.props.name }
                    id={ tag.id }
                    type="checkbox"
                    value={ tag.id }
                    onChange={ () => this.handleInputChange(tag.id, index) }
                    defaultChecked={ this.checked[index] }
                  />
                  <label htmlFor={ tag.id }></label>
                  <div>{ tag.value }</div>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
};
