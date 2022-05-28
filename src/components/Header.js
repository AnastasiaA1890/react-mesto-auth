import React from "react";
import logo from "../images/logo-light.svg";
import {Link, Route} from "react-router-dom";
import {useState} from "react";

function Header(props) {

  return (
    <header className="header">
      <a href="/"><img src={logo} alt="Логотип" className="header__logo"/></a>
      <Route exact path='/'>
        <div className="header__user">
          <p className="header__user-email">{props.email}</p>
          <Link to='/sign-in' className="header__link-email" onClick={props.onSignOut}>SignOut</Link>
        </div>
      </Route>
      <Route path='/sign-in'>
        <Link to='/sign-up' className="header__link">SignUp</Link>
      </Route>
      <Route path='/sign-up'>
        <Link to='/sign-in' className="header__link">SignIn</Link>
      </Route>
      <div className='burger'>
        <div className="burger__link"></div>
        <div className="burger__link"></div>
        <div className="burger__link"></div>
      </div>
    </header>
  )
}

export default Header;
