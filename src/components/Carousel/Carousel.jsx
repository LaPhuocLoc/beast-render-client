// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Navigation, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Row, Col } from 'antd'
import { apiClient } from "../../apiClient/apiClient";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade'

import './carousel.scss'
import Social from '../Social/Social';
import BgText from '../BgText/BgText';
import AddCartBtn from "../AddCartBtn/AddCartBtn";
import Loading from './../Loading/Loading';
const Carousel = () => {
  const qs = require('qs');
  const query = qs.stringify(
    {
      populate: {
        products: {
          populate: ['img', 'categories', 'sub_categories']
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/carousels?${query}`);
        setData(res.data.data[0].attributes.products.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="carousel">
      {loading ? <Loading /> : (
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            spaceBetween={50}
            slidesPerView={1}
            grabCursor={true}
            navigation
            pagination={{
              clickable: true,
              type: 'fraction',
              renderFraction: function (currentClass, totalClass, i) {
                return (`
            <div class="custom-pagination-container">
              <span class="${currentClass}">${i}</span>
              <span class="pagination-divider"></span>
              <span class="${totalClass}">${i}</span>
            </div>
            `)
              }
            }}
            effect='fade'
          >
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <CarouselItem
                    item={item}
                    className={`${isActive ? 'active' : ''}`}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}

const CarouselItem = props => {

  const item = props.item

  return (
    <div
      className={`carousel__item ${props.className}`}
    >
      <div className="carousel__item__content">
        <BgText text={item.attributes.type} />
        <Row>
          <Col xs={2} sm={3}>
            <div className="carousel__item__content__side">
              <div className="align-div"></div>
              <p>welcome to gaming - gears</p>
              <Social />
            </div>
          </Col>
          <Col xs={22} sm={8}>
            <div className="carousel__item__content__info">
              <div className="align-div"></div>
              <div className="carousel__item__content__info-text">
                <div className="carousel__item__content__info-text__title mb-3"><span>{item.attributes?.categories?.data[0]?.attributes?.title}</span><h1>{item.attributes.title}</h1></div>
                <div className="price">
                  <span className="price-up"><i className="fa-solid fa-dollar-sign"></i> {item.attributes.price + 20},-</span>
                  <span className="price-down"><i className="fa-solid fa-dollar-sign"></i> {item.attributes.price},-</span>
                </div>
              </div>
              <AddCartBtn item={item} />
            </div>
          </Col>
          {/* <Col span={13}>
            <div className="carousel__item__content__img">
              <img src={require('../../assets/carousel/' + item.path)} alt="" />
            </div>
          </Col> */}
        </Row>
        <div className="carousel__item__content__img">
          <img src={
             item.attributes?.img?.data?.attributes?.url
          } alt="" />
        </div>
      </div>
    </div>
  )
}

export default Carousel