import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        eachProduct => eachProduct.id === product.id,
      )

      if (existingProduct) {
        return {
          cartList: prevState.cartList.map(eachProduct => {
            if (eachProduct.id === product.id) {
              return {
                ...eachProduct,
                quantity: eachProduct.quantity + product.quantity,
              }
            }
            return eachProduct
          }),
        }
      }

      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(product => product.id !== productId),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cartItem =>
        cartItem.id === productId
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem,
      ),
    }))
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(cartItem =>
          cartItem.id === productId
            ? cartItem.quantity > 1
              ? {...cartItem, quantity: cartItem.quantity - 1}
              : null
            : cartItem,
        )
        .filter(cartItem => cartItem !== null),
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
