import React from 'react'
import './social.scss'
import { Link } from 'react-router-dom'
const social = [
  {
    name: 'facebook',
    icon: 'fa-brands fa-facebook-f',
    path: 'https://www.facebook.com'
  },
  {
    name: 'youtube',
    icon: 'fa-brands fa-youtube',
    path: 'https://www.youtube.com'
  },
  {
    name: 'twitter',
    icon: 'fa-brands fa-twitter',
    path: 'https://www.twitter.com'
  },
]

const Social = () => {
  return (
    <div className="social">
      {social.map((item, i) => (
        <Link key={i} to={item.path}><i className={item.icon}></i></Link>
      ))}
    </div>
  )
}

export default Social