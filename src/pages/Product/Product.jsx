import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { CiShoppingCart, CiDeliveryTruck } from 'react-icons/ci'
import { IoAdd, IoRemove } from 'react-icons/io5'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { apiClient } from './../../apiClient/apiClient';

import './product.scss'

const Product = () => {
  const id = parseInt(useParams().id);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/products/${id}?populate=*`);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false)
    };
    fetchData();
  }, [id]);
  return (
    <div className="product">
      {loading ? "loading" :
        (
          <>
            {/* <div className="slide"></div> */}
            <div className="container">
              <div className="product__img">
                <span>Best Seller</span>
                <img
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img?.data?.attributes?.url
                  }
                  alt=""
                />
              </div>
              <div className="product__content">
                <div className="product-series"><strong>NEW</strong> SERIES</div>
                <h3 className="title">{data.attributes.title}</h3>
                <p className="category">{data.attributes.categories.data[0].attributes.title}</p>
                <span className="price">${data.attributes.price} <span className="old-price">${data.attributes.price + 20}</span></span>
                <div className="quantity">
                  <span className="label">Quantity</span>
                  <div className="quantity-btn">
                    <button
                      onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
                      className={`${quantity === 1 ? 'disable-btn' : ''}`}
                    >
                      <IoRemove />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}>
                      <IoAdd />
                    </button>
                  </div>
                </div>
                <div className="add-cart-div">
                  <p>Instock. Ready to ship</p>
                  <button
                    className="add-cart-btn"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: data.id,
                          title: data.attributes.title,
                          desc: data.attributes.desc,
                          price: data.attributes.price,
                          img: data.attributes.img.data.attributes.url,
                          quantity,
                        })
                      )
                    }
                  >
                    <CiShoppingCart /> <span>ADD TO CART</span>
                  </button>
                </div>
                <div className="freeship">
                  <CiDeliveryTruck />
                  <p>Free shipping and returns</p>
                </div>
                <div className="description">
                  <h5>DESCRIPTION</h5>
                  <p>{data.attributes.desc}</p>
                </div>
                <div className="additional-info">
                  <h5>ADDITIONAL INFORMATION</h5>
                  <p>Brand: <span>{data.attributes.sub_categories.data[0].attributes.title}</span></p>
                  <p>Type: <span>{data.attributes.categories.data[0].attributes.title}</span></p>
                  <p>Tag: gaming, gears, freeship</p>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default Product