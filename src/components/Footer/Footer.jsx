import React from 'react'
import './footer.scss'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import Divider from './../Divider/Divider'
import Social from './../Social/Social';
const info = {
  hotline: '070-8959-2557',
  description: 'BeastStore is the new online shop where you can find and buy one of the best gaming equipment in the lowest price. Since 2022 BeastStore provides devices for gamers like mice, headsets, keyboards, mousepads, computers and others accessories.',
  fullName: 'BeastStore',
  shortName: 'BGS'

}
const col2 = [
  {
    name: 'Mouses',
    path: '/mouse'
  },
  {
    name: 'Keyboards',
    path: '/keyboard'
  },
  {
    name: 'Headsets',
    path: '/headset'
  },
  {
    name: 'Mousepads',
    path: '/mousepad'
  },
]
const col3 = [
  {
    name: 'Register',
    path: '/register'
  },
  {
    name: 'Login',
    path: '/login'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'FAQ',
    path: '/faq'
  },
]
const col4 = [
  {
    name: 'Contact Us',
    path: '/contact'
  },
  {
    name: 'Warranty Policy',
    path: '/warranty'
  },
  {
    name: 'Terms of Use',
    path: '/terms'
  },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <Row>
            <Col span={4}>
              <Social />
            </Col>
            <Col span={4}>
              <ul className="footer__list">
                {col2.map((item, i) => (
                  <li className="footer__item" key={i}>
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={4}>
              <ul className="footer__list">
                {col3.map((item, i) => (
                  <li className="footer__item" key={i}>
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={4}>
              <ul className="footer__list">
                {col4.map((item, i) => (
                  <li className="footer__item" key={i}>
                    <Link to={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={8}>
              <div className="footer__description">
                <p>{info.description}</p>
                <div className="hotline">
                  <span>Customer Support: </span>
                  {info.hotline}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Divider />
      <div className="footer__bottom">
        <div className="container">
          <Row>
            <Col span={8}>
              <h5 className="copyright">
                Copyright © 2022. All rights reserved.
              </h5>
            </Col>
            <Col span={8} offset={8}>
              <div className="logo">
                <Link to='/'>{info.shortName}</Link>
                {info.fullName}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  )
}

export default Footer