import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import IconLogo from '../IconLogo'

import './Header.css'

export default function Header(props) {

  const [menuVisibility, setMenuVisibility] = useState(false);

  const changeMenuVisibility = (e) => {
    e.preventDefault();
    setMenuVisibility(!menuVisibility);
  };

  return (

    <div className="header-container slide-in-top-header"> 

      <div className="desktop-nav">

        <Link to="/" className="desktop-logo-container">

          <IconLogo />
          
        </Link>

        <div className="desktop-nav-links-container">

          <Link to="/" className="desktop-nav-link">Home</Link>

          <Link to="/calendar" className="desktop-nav-link">Calendar</Link>

          <Link to="/rankings" className="desktop-nav-link">Rankings</Link>

          <p className="desktop-nav-link">About</p>

          <a className="desktop-nav-link" target="_blank" href="https://www.gameset.blog">Blog</a>
        </div>

      </div>

      <div className="mobile-nav">

        {menuVisibility ?
        
        <i className="fas fa-times mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
          
        :

        <i className="fas fa-bars mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
      
        }

        <div className="mobile-logo-container">

          <IconLogo style={{
            zIndex: "5",
            textAlign: "center",
            verticalAlign: "center",
            
        }} />

        </div>

          
        <div className="mobile-header-placeholder"></div>
        

      </div>

      <div id="mobile-menu" className={menuVisibility ? "mobile-menu-visible" : "mobile-menu-hidden"}>
      
        <p className="mobile-nav-link">About</p>
        <p className="mobile-nav-link">Blog</p>

      </div>
      
    </div>
  )
}