import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>AzmoBooking</h1>
      </div>
      <nav className="main-navigation__list">
        <ul>
          <li>
            <NavLink to="/auth">Auth</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Booking</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
