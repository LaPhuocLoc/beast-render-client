import React from 'react'
import './gear-card.scss'
import AddCartBtn from "../AddCartBtn/AddCartBtn";
const GearCard = props => {

  const item = props.item

  return (
    <div className="gear-card">
      <div className="gear-card__img">
        <img src={
           item.attributes?.img?.data?.attributes?.url
        } alt="" />
      </div>
      <div className="gear-card__body">
        <div className="name">
          <h3>{item.attributes?.title}</h3>
          <p>{item.attributes?.sub_categories?.data[0]?.attributes?.title}</p>
        </div>
        <div className="price">
          <span>$ {item.attributes?.price},-</span>
        </div>
        <div className="add-to-cart">
          <AddCartBtn item={item}/>
        </div>
      </div>
    </div>
  )
}

export default GearCard