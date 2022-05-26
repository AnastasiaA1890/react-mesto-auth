import React from "react";
import logo from "../images/logo-light.svg";
import {Link, Route} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <a href="/"><img src={logo} alt="Логотип" className="header__logo"/></a>
      <Route exact path='/'>
        <div className="header__user">
          <p className="header__user-email">{props.email}</p>
          <Link to='/sign-in' className="header__link-email" onClick={props.onSignOut}>Выйти</Link>
        </div>
      </Route>
      <Route path='/sign-in'>
        <Link to='/sign-up' className="header__link">Регистрация</Link>
      </Route>
      <Route path='/sign-up'>
        <Link to='/sign-in' className="header__link">Войти</Link>
      </Route>
      {/*<a href="/sign-up" className="header__link">Регистрация</a>*/}
    </header>
  )
}

export default Header;
