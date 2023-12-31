import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';


function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ minHeight: '80px', backgroundColor: '#00bc8c' }}>
      <Container fluid>
        <Navbar.Brand href="/">Food Zap</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#action2">Menu</Nav.Link>
            <NavDropdown title="Login/Sign up" id="navbarScrollingDropdown">
              <Nav.Link as={NavLink} to="/Login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup">
                Sign Up
              </Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
