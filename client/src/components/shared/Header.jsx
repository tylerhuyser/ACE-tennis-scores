import React, { useState } from 'react';

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

        <div className="desktop-logo-container">

          <IconLogo />
          
        </div>

          <div className="desktop-logo-symbol-container">

            <img className="logo" id="logo-symbol" atl="logo-symbol" src="https://i.imgur.com/2Bu6x5X.png" />

          </div>

        <div className="desktop-nav-links-container">

          <p className="desktop-nav-link">About</p>

          <p className="desktop-nav-link">Blog</p>
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