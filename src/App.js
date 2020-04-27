import React from 'react';
import logo from './logo.svg';
import { Menu } from './features/pizza/menu.js';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#home">Pizza Delivery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Menu</Nav.Link>
              <Nav.Link href="#link">Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </header>
      <body >  <Menu /></body>
    </div>
  );
}

export default App;
