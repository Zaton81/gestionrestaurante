import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RESTAURANT_NAME } from "../config/constants";


const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">{RESTAURANT_NAME}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/carta">Carta</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cocteleria">Coctelería</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/reservas">Reservas</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar; 