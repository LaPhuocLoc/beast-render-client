import React, { useEffect } from 'react'
import success from '../../assets/status/success.png'
import { Link } from 'react-router-dom';
import { resetCart } from "../../redux/cartReducer";
import { useDispatch } from 'react-redux';
import './paymentsuccess.scss'
const PaymentSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCart())
  },);
  return (
    <div className="payment-success">
      <div className="payment-success__content">
        <img src={success} alt="payment-success" />
        <h1>Payment successful!</h1>
        <p>Thanks you for your payment.
        </p>
        <p>Check your email for your receipt</p>
        <Link to='/'>CONTINUE SHOPPING</Link>
      </div>
    </div>
  )
}

export default PaymentSuccess