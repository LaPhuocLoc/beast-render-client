import React from 'react'
import './bgtext.scss'
const BgText = props => {
  return (
    <div className="bg-text" >
      <h1>{props.text}</h1>
    </div>
  )
}

export default BgText