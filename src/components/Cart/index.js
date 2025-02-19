import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalCost = 0
      cartList.forEach(eachCartItem => {
        totalCost += eachCartItem.price * eachCartItem.quantity
      })

      const onClickRemoveAllItems = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-desktop-btn"
                  onClick={onClickRemoveAllItems}
                >
                  Remove All
                </button>
                <CartListView />
                <div>
                  <h1>Order Total</h1>
                  <h1>RS {totalCost}</h1>
                  <p>{cartList.length} items in cart</p>

                  {/* Checkout Button with Popup */}
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="checkout-btn">
                        Checkout
                      </button>
                    }
                  >
                    {close => {
                      const [paymentMethod, setPaymentMethod] = useState('')
                      const [orderPlaced, setOrderPlaced] = useState(false)

                      const handleConfirmOrder = () => {
                        setOrderPlaced(true)
                      }

                      return (
                        <div className="popup-container">
                          {!orderPlaced ? (
                            <>
                              <h2>Order Summary</h2>
                              <p>Total Items: {cartList.length}</p>
                              <p>Total Price: RS {totalCost}</p>

                              <h2>Choose Payment Method</h2>
                              <div>
                                <label>
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="net-banking"
                                    disabled
                                  />
                                  Net Banking
                                </label>
                                <label>
                                  <input
                                    type="radio"
                                    name="payment"
                                    value="cash-on-delivery"
                                    checked={
                                      paymentMethod === 'cash-on-delivery'
                                    }
                                    onChange={e =>
                                      setPaymentMethod(e.target.value)
                                    }
                                  />
                                  Cash on Delivery
                                </label>
                              </div>

                              <button
                                type="button"
                                disabled={paymentMethod !== 'cash-on-delivery'}
                                onClick={handleConfirmOrder}
                              >
                                Confirm Order
                              </button>

                              <button type="button" onClick={() => close()}>
                                Close
                              </button>
                            </>
                          ) : (
                            <h2>Your order has been placed successfully</h2>
                          )}
                        </div>
                      )
                    }}
                  </Popup>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
