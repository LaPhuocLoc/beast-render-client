import React, { useEffect, useState } from 'react'
import { IoMenu, IoCartOutline, IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../redux/modalReducer";
import './header.scss'

const headerData = {
  all: {
    title: 'All Products',
    img: 'all.jpg'
  },
  categories: [
    {
      title: 'keyboard',
      img: 'keyboard.png'
    },
    {
      title: 'mouse',
      img: 'mouse.png'
    },
    {
      title: 'chair',
      img: 'chair.png'
    },
    {
      title: 'headset',
      img: 'headset.png'
    },
    {
      title: 'mousepad',
      img: 'mousepad.png'
    },
  ],
  brands: [
    {
      title: 'varmilo',
      img: 'varmilo.png'
    },
    {
      title: 'sony',
      img: 'sony.jpg'
    },
    {
      title: 'logitech',
      img: 'logitech.jpg'
    },
    {
      title: 'steelseries',
      img: 'steelseries.jpg'
    },
    {
      title: 'razer',
      img: 'razer.jpg'
    },
  ]
}

const Header = () => {
  const dispatch = useDispatch();
  const [small, setSmall] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const productsLength = useSelector((state) => state.cart.products.length);
  const handleMenuOpen = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  const handleDirect = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setSmall(window.pageYOffset > 150)
      })
    }
  }, [])
  return (
    <>
      <div className={`header ${small ? "small" : ""} ${isOpen ? 'active' : ''}`}>
        <div className="container pd-20-percent header__content">
          <div className="left" onClick={handleMenuOpen}>
            <div className="menu-icon" >
              <IoMenu className={!isOpen ? 'active' : ''} />
              <IoClose className={isOpen ? 'active' : ''} />
            </div>
          </div>
          <div className="center">
            <div className="logo">
              <Link to="/">BeastStore <span>™</span></Link>
            </div>
          </div>
          <div className="right">
            <div className="cart" onClick={() => dispatch(openModal())}>
              <IoCartOutline />
            </div>
            <span>{productsLength}</span>
          </div>
        </div>

        <div className={`menu ${isOpen ? 'active' : ''}`}>
          <div className="container pd-20-percent">
            <div className="menu__all-products">
              <Link to="/products/all" onClick={handleDirect}>
                <h3 className="title">All Products</h3>
                <div className="overlay"></div>
                <img src={require(`../../assets/header/${headerData.all.img}`)} alt="" />
              </Link>
            </div>
            <div className="menu__categories">
              {headerData.categories.map((item, i) => (
                <div key={i} className="category__item">
                  <Link to={`/categories/${item.title}`} onClick={handleDirect}>
                    <div className="img">
                      <img src={require(`../../assets/header/${item.img}`)} alt="" />
                    </div>
                    <div className="title">
                      {item.title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="menu__brands">
              {headerData.brands.map((item, i) => (
                <div key={i} className="category__item">
                  <Link to={`/sub-categories/${item.title}`} onClick={handleDirect}>
                    <div className="img">
                      <img src={require(`../../assets/header/${item.img}`)} alt="" />
                    </div>
                    <div className="title">
                      {item.title}
                    </div></Link>
                </div>
              ))}
            </div>
            <div className="menu__imgs">

            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Header