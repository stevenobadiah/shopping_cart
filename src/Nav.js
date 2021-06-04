import React from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import Cart from './Cart';

function Nav() {
  return (
    <nav>
      <ul id="navLinks">
        <Link to="/shop">
          <li className={"nav-link"}>Shop</li>
        </Link>
        <Link to="/about">
          <li className={"nav-link"}>About</li>
        </Link>
        <Link to="/cart">
          <li className={"nav-link"} id="btnCart">Cart</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;