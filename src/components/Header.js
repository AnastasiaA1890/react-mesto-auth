import React from "react";
import logo from "../images/logo-light.svg";

function Header() {
  return (
    <header className="header">
      <a href="#"><img src={logo} alt="Логотип" className="header__logo"/></a>
      <a href="/sign-up" className="header__link">Регистрация</a>
    </header>
  )

}

export default Header;
