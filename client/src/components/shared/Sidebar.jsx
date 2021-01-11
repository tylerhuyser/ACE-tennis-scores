import React from 'react'
import { Link } from 'react-router-dom';

import './Sidebar.css'

export default function Sidebar() {
  

  return (
    <div className="sidebar-container">

        <Link to="/">
          <i className="fas fa-home sidebar-icon"></i>
        </Link>

        <Link to="/calendar">
          <i className="far fa-calendar-alt sidebar-icon"></i>
        </Link>

        <Link to="/rankings">
          <i className="fas fa-list-ul sidebar-icon"></i>
        </Link>

    </div>
  )  
}