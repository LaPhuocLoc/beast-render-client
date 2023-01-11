import React, { useRef } from 'react'

import './button.scss'
const Button = props => {
  const btnRef = useRef(null)

  const handleHoverIn = () => {
    btnRef.current.classList.add('is-hover')
  }
  const handleHoverOut = () => {
    btnRef.current.classList.remove('is-hover')
  }
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? props.onClick : null}
      type={props.type}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
      ref={btnRef}
    >
      <span className="btn-text">{props.children}</span>
      <span className="btn-icon">
        {props.type === "plus" ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-minus"></i>}
      </span>
    </button>
  )
}

export default Button