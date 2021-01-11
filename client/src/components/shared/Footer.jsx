import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer () {

    return (
      <div className="footer-container slide-in-bottom-nav">

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