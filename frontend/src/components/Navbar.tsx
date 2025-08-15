import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RESTAURANT_NAME } from "../config/constants";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

const Navbar: React.FC = () => (
  <RBNavbar bg="dark" variant="dark" expand="lg" role="navigation" aria-label="Menú principal">
    <Container fluid>
      <RBNavbar.Brand as={Link} to="/">{RESTAURANT_NAME}</RBNavbar.Brand>
      <RBNavbar.Toggle aria-controls="navbarNav" />
      <RBNavbar.Collapse id="navbarNav">
        <Nav className="ms-auto">
          <NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? "nav-link active-link" : "nav-link"}>Inicio</NavLink>
          <NavLink to="/carta" className={({ isActive }: { isActive: boolean }) => isActive ? "nav-link active-link" : "nav-link"}>Carta</NavLink>
          <NavLink to="/cocteleria" className={({ isActive }: { isActive: boolean }) => isActive ? "nav-link active-link" : "nav-link"}>Coctelería</NavLink>
          <NavLink to="/reservas" className={({ isActive }: { isActive: boolean }) => isActive ? "nav-link active-link" : "nav-link"}>Reservas</NavLink>
          <NavLink to="/contacto" className={({ isActive }: { isActive: boolean }) => isActive ? "nav-link active-link" : "nav-link"}>Contacto</NavLink>
        </Nav>
      </RBNavbar.Collapse>
    </Container>
  </RBNavbar>
);

export default Navbar; 