import React from 'react';

export class ColorBox extends React.Component {
  colors = [
    {
      label: 'white',
      value: '#fff',
      default: true
    },
    {
      label: 'red',
      value: '#f28b82',
      default: false
    },
    {
      label: 'blue',
      value: '#cbf0f8',
      default: false
    },
    {
      label: 'yellow',
      value: '#fff475',
      default: false
    },
    {
      label: 'green',
      value: '#ccff90',
      default: false
    },
    {
      label: 'brown',
      value: '#e6c9a8',
      default: false
    },
    {
      label: 'gray',
      value: '#e8eaed',
      default: false
    },
    {
      label: 'orange',
      value: '#fbbc04',
      default: false
    },
    {
      label: 'bark-blue',
      value: '#0076b4',
      default: false
    },
    {
      label: 'purple',
      value: '#b448ae',
      default: false
    }
  ];
  state = {
    color: this.props.defaultColor ? this.props.defaultColor : '#fff'
  };

  updateColor = (evt) => {
    const color = evt.target.value;

    this.setState(({ color }))
    this.props.updateColor(color);
  };

  render() {
    return (
      <div className="color-box">
        {
          this.colors.map((color, index) => (
            <div key={ color.value }>
              <input
                ref={ color.value + this.props.name }
                id={ color.value + this.props.name }
                type="radio"
                name={ this.props.name }
                value={ color.value }
                onChange={ this.updateColor }
                checked={ this.state.color === color.value }
              />

              <label
                htmlFor={ color.value + this.props.name }
                className={ `pointer ${this.props.name + index}` }
                style={{
                  backgroundColor: color.value,
                }}
              />
            </div>
          ))
        }
      </div>
    );
  }
}
export default ColorBox;
