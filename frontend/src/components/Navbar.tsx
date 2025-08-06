import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RESTAURANT_NAME } from "../config/constants";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";

const Navbar: React.FC = () => (
  <RBNavbar bg="dark" variant="dark" expand="lg" className="opacity-75" role="navigation" aria-label="Menú principal">
    <Container fluid>
      <RBNavbar.Brand as={Link} to="/">{RESTAURANT_NAME}</RBNavbar.Brand>
      <RBNavbar.Toggle aria-controls="navbarNav" />
      <RBNavbar.Collapse id="navbarNav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/carta">Carta</Nav.Link>
          <Nav.Link as={NavLink} to="/cocteleria">Coctelería</Nav.Link>
          <Nav.Link as={NavLink} to="/reservas">Reservas</Nav.Link>
          <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
        </Nav>
      </RBNavbar.Collapse>
    </Container>
  </RBNavbar>
);

export default Navbar; 