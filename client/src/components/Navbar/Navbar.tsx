import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/GraphqlState";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>AzmoBooking</h1>
      </div>
      <nav className="main-navigation__list">
        <ul>
          {!isAuthenticated && (
            <li>
              <NavLink to="/auth">Authentication</NavLink>
            </li>
          )}

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
