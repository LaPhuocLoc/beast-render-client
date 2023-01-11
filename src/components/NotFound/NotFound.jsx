import React from 'react'
import notfound from '../../assets/notfound/notfound.png'
import { Link } from 'react-router-dom';
import './notfound.scss'
const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound__content">
        <img src={notfound} alt="notfound" />
        <p>We're sorry, the page you requested
          could not be found
        </p>
        <p>Please go back to the homepage</p>
        <Link to='/'>GO HOME</Link>
      </div>
    </div>
  )
}

export default NotFound