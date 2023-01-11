// @ts-nocheck
import React from "react";
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper';
import { Row, Col } from 'antd'
import useFetch from '../../hooks/useFetch'
import './gear-list.scss'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import "swiper/css/free-mode";

import Button from './../Button/Button';
import GearCard from './../GearCard/GearCard';
import BgText from './../BgText/BgText'
const GearList = ({ type, bgText, cate }) => {

  const { data, loading, error } = useFetch(
    `/products?populate=*&filters[type][$eq]=${type}`
  );
  // console.log(data)

  return (
    <section className="gear-list" >
      <BgText text={bgText} />
      <div className="gear-list__heading">
        <div className="container">
          <Row>
            <Col sm={8}>
              <h2 className="title">{type} Gears</h2>

            </Col>
            <Col sm={8} offset={8}>
              <div className="browse">
                <Link to={cate}>
                  <Button type="minus">Browse</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="gear-list__slide">
        <div className="container">
          <div className="gear-list__slide__side">
            <p>most popular gaming gears</p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            slidesPerView={1}
            spaceBetween={0}
            grabCursor={true}
            nested={true}
            navigation
            freeMode={true}
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
            breakpoints={{
              // when window width is >= 640px
              576: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              992: {
                slidesPerView: 4,
              },
            }}
          >
            {data.map((item, i) => (
              <SwiperSlide key={i} >
                <Link to={`/product/${item.id}`}>
                  <GearCard item={item} />
                </Link>
              </SwiperSlide>
            ))}

          </Swiper>

        </div>
      </div>
    </section>
  )
}

export default GearList