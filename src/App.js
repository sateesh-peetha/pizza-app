import React from 'react';
import { Route, Switch, HashRouter } from "react-router-dom"
import logo from './logo.svg';
import { Menu } from './features/pizza/menu.js';
import Cart from './features/pizza/cart.js';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#/menu">Pizza Delivery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/menu">Menu</Nav.Link>
              <Nav.Link href="#/cart">Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <body >

        <HashRouter>
          <Switch>
          <Route exact path="/" component={Menu} />
            <Route exact path="/menu" component={Menu} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </HashRouter>

      </body>
    </div>
  );
}

export default App;
