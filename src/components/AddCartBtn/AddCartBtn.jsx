import React from 'react'
import Button from '../Button/Button'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { openModal } from "../../redux/modalReducer";
const AddCartBtn = props => {
  const dispatch = useDispatch();
  const item = props.item
  const handleOpenCart = () => {
    dispatch(openModal())
  }
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id: item.id,
        title: item.attributes.title,
        desc: item.attributes.desc,
        price: item.attributes.price,
        img: item.attributes.img.data.attributes.url,
        brand: item.attributes.sub_categories.data[0].attributes.title,
        quantity: props.quantity || 1,
      })
    )
    handleOpenCart()
  }

  return (
    <Button
      className={props.className}
      onClick={handleAddToCart}
      type="plus"
    >
      ADD TO CART
    </Button>
  )
}

export default AddCartBtn