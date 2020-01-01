import React from 'react';
import TextBox from './TextBox'

class ProductLine extends React.Component {

  render() {
    let lineColor = (this.props.index % 2 === 0 )? "bg-grey-light" : "bg-grey-lightest"
    return (
      <div className="flex justify-center">
        <div className="flex  w-5/6  text-xl ">
        <TextBox lineColor={lineColor} name={this.props.name} index={this.props.index} value={this.props.value} handleChange={this.props.handleChange} />
        <div className={lineColor + " w-2/5 bg-grey-darkest p-2 m-px"}>{this.props.description}</div>
        <div className={lineColor + " w-1/5 p-2 m-px"}>$ {this.props.price}</div>
        <div className={lineColor + " w-1/5 p-2 m-px"}>{(this.props.displayCost === "") ? "" : "$ " + this.props.displayCost}</div>
        </div>
      </div>

    )
  }
}

export default ProductLine;
