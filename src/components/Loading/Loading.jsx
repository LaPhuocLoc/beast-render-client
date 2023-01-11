import React from 'react'
import './loading.scss'
const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="wrapper">
        <h1>
          <span>LOADING</span>
          <span class="let1">.</span>
          <span class="let2">.</span>
          <span class="let3">.</span>
        </h1>
      </div>
    </div>
  )
}

export default Loading