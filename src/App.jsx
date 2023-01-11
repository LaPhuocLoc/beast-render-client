import React, { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from "./redux/modalReducer";
import NoMobileSupport from './components/NoMobileSupport/NoMobileSupport';
import NotFound from './components/NotFound/NotFound';
import Loading from "./components/Loading/Loading";
import Cart from "./components/Cart/Cart";
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';

import AOS from 'aos';
import "antd/dist/antd.min.css";
import 'aos/dist/aos.css';
import './App.scss'
// const Cart = lazy(() => import('./components/Cart/Cart'))
const Footer = lazy(() => import('./components/Footer/Footer'));
const Header = lazy(() => import('./components/Header/Header'));
const Home = lazy(() => import('./pages/Home/Home'));
const Categories = lazy(() => import('./pages/Categories/Categories'));
const Product = lazy(() => import('./pages/Product/Product'));

const App = () => {
  const dispatch = useDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isOpen } = useSelector((store) => store.modal)
  useEffect(() => {
    AOS.init({
      duration: 1200,
    })
    const handleWindowResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])


  return (
    <>
      {isSmallScreen ? <NoMobileSupport />
        :
        (
          <BrowserRouter>
            {isOpen && <Cart open={isOpen} onClose={() => dispatch(closeModal())} />}
            <Suspense fallback={<Loading />}>
              <div className="main">
                <Header />
                <Routes>
                  {/* <Route path="/:categories/search/:keyword" element={<Categories />} /> */}
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/products/all" element={<Categories />} />
                  <Route path="/categories/:name" element={<Categories />} />
                  <Route path="/sub-categories/:name" element={<Categories />} />
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/order/success" element={<PaymentSuccess />} />
                </Routes>
                <Footer />
              </div>
            </Suspense>
          </BrowserRouter>
        )
      }
    </>
  )
}

export default App