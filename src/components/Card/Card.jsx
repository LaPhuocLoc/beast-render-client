import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import AddCartBtn from "../AddCartBtn/AddCartBtn";
const Card = ({ item }) => {
  return (
    <motion.div
      key={item.id}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Link className="link" to={`/product/${item.id}`}>
        <div className="card">
          <div className="top">
            {item?.attributes.isNew && <span>Best Seller</span>}
            <img
              src={
                item.attributes?.img?.data?.attributes?.url
              }
              alt=""
            />
          </div>
          <div className="body">
            <div className="product-series">
              <p>NEW SERIES</p>
            </div>
            <h2>{item?.attributes.title}</h2>
            <div className="prices">
              <h3>${item.oldPrice || item?.attributes.price + 20}</h3>
              <h3>${item?.attributes.price}</h3>
            </div>
            <div className="add-to-cart">
              <AddCartBtn className="xs-small" item={item} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;