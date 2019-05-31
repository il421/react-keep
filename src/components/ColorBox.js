import React from 'react';

export default class ColorBox extends React.Component {
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
    }
  ]

  changeColor = (evt) => {
    const targetColor = evt.target.value;
    this.colors.forEach((color) => {
      color.default = color.value === targetColor;
    })

    this.props.changeColor(targetColor)
  }

  render() {
    return (
      <div className="color-box">
        {
          this.colors.map((color) => (
            <div key={ color.value }>
              <label
                htmlFor={ color.value }
                className="pointer"
                style={{
                  backgroundColor: color.value,
                  border: color.default && '1px solid black'
                }}
              />
              <input
                id={ color.value }
                type="radio"
                name="color"
                value={ color.value }
                onChange={ this.changeColor }
              />
            </div>
          ))
        }
      </div>
    );
  }
};
