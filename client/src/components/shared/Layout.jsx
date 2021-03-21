import React from 'react'

import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'
import Footer from '../shared/Footer'

import './Layout.css'

export default function Layout (props) {

  return (
    <div className="layout-container">

      <Header
      />

      <div className="body-container">

          
        {/* <Sidebar /> */}

        {props.children}

      </div>

      <Footer />

    </div>
  )
}