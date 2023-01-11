import React, { useEffect } from 'react'
import './home.scss'
import Carousel from '../../components/Carousel/Carousel';
import GearGrid from '../../components/GearGrid/GearGrid';
import GearList from '../../components/GearList/GearList';
import Divider from '../../components/Divider/Divider';
import ProGamer from '../../components/ProGamer/ProGamer';
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
      {/* <div className="slide"></div> */}
      <Carousel />
      <GearGrid />
      <GearList type="featured" bgText="featured" cate="featured" />
      <Divider />
      <GearList type="trending" bgText="trending" cate="trending" />
      <Divider />
      <ProGamer />
    </>
  )
}

export default Home