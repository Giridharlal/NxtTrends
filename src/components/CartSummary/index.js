import {useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalCost = 0

      if (Array.isArray(cartList)) {
        cartList.forEach(eachCartItem => {
          totalCost += eachCartItem.price * eachCartItem.quantity
        })
      }

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-heading">Order Total</h1>
          <h1 className="total-cost">RS {totalCost}</h1>
          <p className="items-count">{cartList.length} items in cart</p>

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
                      <h2 className="popup-heading">Order Summary</h2>
                      <p className="popup-info">
                        Total Items: {cartList.length}
                      </p>
                      <p className="popup-info">Total Price: RS {totalCost}</p>

                      <h2 className="popup-heading">Choose Payment Method</h2>
                      <div className="payment-options">
                        <label className="payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value="net-banking"
                            disabled
                          />
                          Net Banking
                        </label>
                        <label className="payment-option">
                          <input
                            type="radio"
                            name="payment"
                            value="cash-on-delivery"
                            checked={paymentMethod === 'cash-on-delivery'}
                            onChange={e => setPaymentMethod(e.target.value)}
                          />
                          Cash on Delivery
                        </label>
                      </div>

                      <button
                        type="button"
                        className="confirm-btn"
                        disabled={paymentMethod !== 'cash-on-delivery'}
                        onClick={handleConfirmOrder}
                      >
                        Confirm Order
                      </button>

                      <button
                        type="button"
                        className="close-btn"
                        onClick={() => close()}
                      >
                        Close
                      </button>
                    </>
                  ) : (
                    <h2 className="success-message">
                      Your order has been placed successfully
                    </h2>
                  )}
                </div>
              )
            }}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
