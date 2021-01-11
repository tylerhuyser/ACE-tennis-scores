import React from 'react'
import { Link } from 'react-router-dom';

import './Sidebar.css'

export default function Sidebar() {
  

  return (
    <div className="sidebar-container">

        <Link to="/home">
          <i className="fas fa-home mobile-footer-icon"></i>
        </Link>

        <Link to="/calendar">
          <i className="far fa-calendar-alt mobile-footer-icon"></i>
        </Link>

        <Link to="/rankings">
          <i className="fas fa-list-ul mobile-footer-icon"></i>
        </Link>

    </div>
  )  
}