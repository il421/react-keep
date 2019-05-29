import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : '',
      text: props.note ? props.note.text : '',
      createAt: props.note ? moment(props.note.createAt) : moment(),
    };
  }

  onTitleChange = (evt) => {
    const title = evt.target.value;
    this.setState(() => ({ title }));
  };

  onTextChange = (evt) => {
    const text = evt.target.value;
    this.setState(() => ({ text }));
  }

  render() {
    return (
      <div>
        <form>
          <input
            className="form__title"
            type="text"
            autoFocus
            value={ this.state.title }
            onChange={this.onTitleChange}
          />
          <textarea
            className="form__text"
            value={ this.state.text }
            onChange={this.onTextChange}
          />
        </form>
      </div>
    );
  }
}

NewNote.propTypes = {
  note: PropTypes.object
}
