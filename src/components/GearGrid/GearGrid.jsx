// @ts-nocheck
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import './geargrid.scss'

import Button from '../Button/Button'
import BgText from '../BgText/BgText'
const GearGrid = () => {

  const items = [
    {
      "name": "mouses",
      "startPrice": "29",
      "path": "mouse.png",
      "id": 1,
      "url": "/categories/mouse"
    },
    {
      "name": "headsets",
      "startPrice": "49",
      "path": "headset.png",
      "id": 2,
      "url": "/categories/headset"
    },
    {
      "name": "keyboards",
      "startPrice": "24",
      "path": "keyboard.png",
      "id": 3,
      "url": "/categories/keyboard"
    },
    {
      "name": "mousepads",
      "startPrice": "10",
      "path": "mousepad.png",
      "id": 4,
      "url": "/categories/mousepad"
    }
  ]

  return (
    <>
      <section className="geargrid">
        <Row>
          {items.map((item, i) => (
            <Col xs={24} lg={12} key={i}>
              <div className="geargrid__item" id={`geargrid__item-${i}`}>
                <BgText text={item.name} />
                <Row>
                  <Col span={6} offset={3}>
                    <div className="geargrid__item__info">
                      <div className="price">
                        <span className="price-text mb-1">Starting from</span>
                        <span className="price-num">$ {item.startPrice},-</span>
                      </div>
                      <div className="browse">
                        <h2 className="name mb-2">{item.name}</h2>
                        <Link to={item.url}>
                          <Button type="minus">
                            Browse
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="geargrid__item__img" id={`img-${item.name}`}>
                  <img src={require('../../assets/geargrid/' + item.path)} alt="" />
                </div>
              </div>
            </Col>
          ))}

        </Row>
      </section>

    </>
  )
}

export default GearGrid