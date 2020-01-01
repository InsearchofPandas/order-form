import React, {Component} from 'react';
import './css/tailwind.css';
import ProductLine from './components/ProductLine';
import SelectBox from './components/SelectBox'

const catalog = require('./catalog.json');


class App extends Component {
  constructor(props) {
    super(props);
    let products = this.orderCreate()
    this.state = {
      products: products,
      shipping: 0
    }
  }
  orderCreate() {
    let products = []
    let product = {}
    let i
    for (i = 0; i < catalog.length; i++) {
      product = {
        description: catalog[i].description,
        price: catalog[i].price,
        quantity: "",
        cost: 0,
        displayCost: ""
      }
      products.push(product)
    }
    return products
  }

  handleChange = event => {
    switch (event.target.name) {
      case "product":
      let quantityUpdate = this.state.products
      let displayQuantity
      
      if (isNaN(event.target.value) === true) {
        displayQuantity = quantityUpdate[event.target.id].quantity
      } else {displayQuantity =  event.target.value }

      displayQuantity = Math.floor(displayQuantity)

      let quantityCost = (displayQuantity * quantityUpdate[event.target.id].price)
      let displayCost = (displayQuantity * quantityUpdate[event.target.id].price)

      displayCost = displayCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

      quantityUpdate[event.target.id].quantity = displayQuantity
      quantityUpdate[event.target.id].cost = quantityCost
      quantityUpdate[event.target.id].displayCost = displayCost

      this.setState({products: quantityUpdate})
        break;
      case "shipping" : switch (event.target.value) {

      case "Free":
        let shippingPrice = 0
        this.setState({shipping: shippingPrice})
        break;
      case "2 Day":
        shippingPrice = 9.99
        this.setState({shipping: shippingPrice})
        break;
      case "Overnight":
        shippingPrice = 24.99
        this.setState({shipping: shippingPrice})
        break;
      default:
    }
    break;
    default :
    }
  }


  render() {

    let total = 0
    let i
    for (i = 0; i < this.state.products.length; i++) {
      total += this.state.products[i].cost
    }
    total += this.state.shipping
    total = total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return (<div className="h-screen" >

      <header className="flex">
        <h1 className="w-full bg-grey-light text-center my-6 py-4 font-normal ">Order Form</h1>
      </header>

      <div className="flex justify-center mb-4 h-4">
        <div className="text-center">Enter the product quantities and select shipping</div>
      </div>

      <div className="flex justify-center ">
        <div className="flex  w-5/6  text-white text-xl ">
          <div className="w-1/5 bg-grey-darkest p-2 m-px">Quantity</div>
          <div className="w-2/5 bg-grey-darkest p-2 m-px">Description</div>
          <div className="w-1/5 bg-grey-darkest p-2 m-px">Price</div>
          <div className="w-1/5 bg-grey-darkest p-2 m-px">Cost</div>
        </div>
      </div>

      {this.state.products.map((product, i) => <ProductLine key={product.description} description={product.description} name={'product'} price={product.price} quantity={product.quantity} displayCost={product.displayCost} index={i} value={product.quantity} handleChange={this.handleChange}/>)}

      <div className="flex justify-center ">
        <div className="flex  w-5/6  text-white text-xl ">
          <SelectBox name="shipping" handleChange={this.handleChange} options={[
              "Free",
              "2 Day",
              "Overnight"
            ]}
            />
          <div className="w-2/5 bg-grey-darkest p-2 m-px">Shipping</div>
          <div className="w-1/5 bg-grey-darkest p-2 m-px"></div>
          <div className="w-1/5 bg-grey-darkest p-2 m-px">{(this.state.shipping === 0) ? "Free" : "$ " + this.state.shipping}</div>
        </div>
      </div>

      <div className="flex justify-center ">
        <div className="flex  w-5/6  text-white text-xl ">
          <div className="w-1/5 bg-grey-darkest p-2 m-px"></div>
          <div className="w-2/5 bg-grey-darkest p-2 m-px">Total</div>
          <div className="w-1/5 bg-grey-darkest p-2 m-px"></div>
          <div className="w-1/5 bg-grey-darkest p-2 m-px">$ {total}</div>
        </div>
      </div>

      <footer class="flex justify-center flex-col lg:flex-row w-full py-8 mt-8 bg-grey-light">
        <a href="https://kylehumphrey.com" target="_blank" rel="noopener noreferrer" className="text-black no-underline px-4">
          Made by Kyle Humphrey
        </a>
        <a href="https://github.com/InsearchofPandas/order-form" target="_blank" rel="noopener noreferrer" className="text-black no-underline px-4">
          View Code on GitHub
        </a>
      </footer>

    </div>);
  }
}

export default App;
