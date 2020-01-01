import React from 'react'

class TextBox extends React.Component {
  render() {
    return (<input type="text" id={this.props.index} value={this.props.value}  name={this.props.name} className={this.props.lineColor + " w-1/5 p-2 m-px"} onChange={this.props.handleChange} />)
  }
}

export default TextBox;
