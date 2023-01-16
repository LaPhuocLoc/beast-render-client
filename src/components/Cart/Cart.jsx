import React from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { IoRemove, IoAdd, IoTrash, IoChevronForward } from 'react-icons/io5';
import { incrementQuantity, decrementQuantity, removeItem } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion"
import './cart.scss'
import { Link } from 'react-router-dom';
import { apiClient } from './../../apiClient/apiClient';
const Cart = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.products)
  const totalPrice = useSelector(state => state.cart.products.reduce(
    (total, item) => total + item.price * item.quantity, 0)
  )
  const stripePromise = loadStripe(
    'pk_test_51MMpHYKePpN4Y5sY25NzZ1rCk4s9KgqWJ1aIjoREth6cQZAieBN22TeXaKDB65OOLC5vUxZqzxV2pYpvV76Xm34C00LLwISzat'
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await apiClient.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer
      title="CART"
      placement="right"
      onClose={onClose}
      open={open}
      width="460"
      className="cart"
    >
      {products.length === 0 ? 'Your cart is currently empty. Begin shopping now' : (
        <>
          <div className="cart-content">
            <div className="cart-list">
              {products.map(item => (
                <div className="cart-item">
                  <div className="img">
                    <Link to={`/product/${item.id}`} reloadDocument>
                      <img src={ item.img} alt="" />
                    </Link>
                  </div>
                  <div className="content">
                    <div className="top">
                      <div className="title">
                        <h5>{item.title}</h5>
                        <p>{item.brand}</p>
                      </div>
                      <div className="remove-item" onClick={() => dispatch(removeItem(item.id))}>
                        <IoTrash />
                      </div>
                    </div>
                    <div className="body">
                      <div className="quantity-btn">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className={`${item.quantity === 1 ? 'disable-btn' : ''}`}
                        >
                          <IoRemove />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}>
                          <IoAdd />
                        </button>
                      </div>
                      <h4 className="price">${item.price * item.quantity}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-footer">
            <div className="sub-total">
              <p className="sub-total-label"><strong>Item Subtotal:</strong> (Not Including Tax or Shipping)</p>
              <h3>{`$${totalPrice}`}</h3>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="checkout">
              <button className="checkout-btn" onClick={handlePayment}>
                <span>CHECKOUT</span>
                <IoChevronForward />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </Drawer>
  )
}

export default Cart