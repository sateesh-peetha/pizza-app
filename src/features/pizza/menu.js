import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from "react-select";
import {
  add,
  setProducts,
  selectLoading,
  selectMenu,
  toggleLoading,
  selectCart,
  increaseQuantity,
  decreaseQuantity,
  selectCurrencySymbol,
  selectCurrencyFactor,
  selectCrust
} from './pizzaSlice';
import {
  Card, Button, CardDeck, CardGroup, Dropdown, FormControl,
  Container, Col, Row, ButtonGroup, ListGroup, ListGroupItem
} from 'react-bootstrap';
import { data } from './data';



export function Menu() {
  const loading = useSelector(selectLoading);
  const menu = useSelector(selectMenu);
  const cart = useSelector(selectCart);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const currencyFactor = useSelector(selectCurrencyFactor);
  const dispatch = useDispatch();
  if (!loading) {
    dispatch(toggleLoading());
    const apiResponse = fetch("https://pokeapi.co/api/v2/pokemon").then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function (datta) {
          dispatch(setProducts(data))
        });
      }
    ).catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  }

  const selectStyle = {
    control: base => ({
      ...base,
      border: 0,
      padding: 0,
      marginTop: -11,
      fontSize: 11,
      borderBottom: '1px dotted grey',
      // This line disable the blue border
      boxShadow: "none"
    }),
    option: (provided, state) => ({
      ...provided,
      border: 0,
      fontSize: 10,
      padding: 0,
    }),
  };

  const handleChange = (selectedOption) => {
    dispatch(selectCrust(selectedOption));
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={8}>
          <CardDeck style={{ display: "flex" }}> {
            menu.map(item => {
              return (
                <Row class={"row equal"} style={{ paddingBottom: "5px" }}>
                  <Col>
                    <div key={item.id}>
                      <Card style={{ width: '14rem', height: "100%" }} >
                        <Card.Img variant="top" src={`./img/${item.image}`} />
                        <Card.Body>
                          <Card.Title style={{ textAlign: "left" }}>{item.name} </Card.Title>
                          <Card.Text style={{ textAlign: "left", fontSize: "12px", fontColor: "grey" }} >{item.description}</Card.Text>

                          <Row>
                            <Col>
                              <label style={{ fontSize: "12px" }}>Select Crust</label>
                              <Select
                                styles={selectStyle}
                                placeholder="select" align="left"
                                onChange={(e) => handleChange({ ...e, item: item.id })}
                                options={
                                  item.crust.map(crust => {
                                    return { label: crust.name, value: crust.crustId }
                                  })
                                }
                              >

                              </Select>
                            </Col>
                            <Col>

                            </Col>
                          </Row>

                          <Row>
                            <Col sm="5">
                              <div align="left" style={{ marginTop: "3px" }}>
                                {(item.defaultPrice * currencyFactor) + currencySymbol}
                              </div>
                            </Col>
                            <Col sm="7">
                              <div align="right">
                                {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                  <ButtonGroup aria-label="Basic example" >
                                    <Button size="sm" variant="link" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                    <Button size="sm" variant="light">{cart.find(order => order.id === item.id).quantity}</Button>
                                    <Button size="sm" variant="link" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                  </ButtonGroup>
                                  :
                                  <Button size="sm" variant="link" onClick={() => dispatch(add(item.id))}>Add to Cart</Button>
                                }
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
              )
            })
          }

          </CardDeck>
        </Col>
        <Col sm={4} style={{ maxHeight: "400px" }} >
          <Card style={{ width: '15rem', height: "100%" }} >
            <ListGroup className="list-group-flush" style={{ paddingTop: "0px" }}>
              {cart.length === 0 ?
                <div align="center" style={{ paddingTop: "50px" }}>
                  <h6>YOUR CART IS EMPTY </h6>
                  <p>Please add some items from the menu. </p>
                </div> : <div></div>
              }
              {
                cart.map(item => {
                  return (
                    <div key={item.id}>
                      <ListGroupItem style={{ maxHeight: "300px" }}>
                        <Row>
                          <Col sm={3}>
                            <Card.Img variant="left" src={`./img/${item.image}`} width="50px" height="50px" />
                          </Col>
                          <Col sm={9} style={{ marginTop: "-3px" }}>
                            <h6 style={{ textAlign: "left" }}>{item.name}</h6>
                            <p style={{ textAlign: "left", fontSize: "10px", fontColor: "grey", marginTop: "-7px" }} >{item.description}</p>
                            <p style={{ textAlign: "left", fontSize: "10px", fontColor: "grey", marginTop: "-9px" }}> <b>{item.crustSize} | {item.crustName}</b></p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={3}>
                            <div align="left" style={{ marginTop: "-10px" }}>
                              {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                <ButtonGroup aria-label="Quantity" >
                                  <Button size="sm" variant="link" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                  <Button size="sm" variant="light">{cart.find(order => order.id === item.id).quantity}</Button>
                                  <Button size="sm" variant="link" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                </ButtonGroup>
                                :
                                <Button size="sm" variant="link" onClick={() => dispatch(add(item.id))}>Add to Cart</Button>
                              }
                            </div>
                          </Col>
                          <Col sm={9} style={{ marginTop: "-3px" }}>
                            <div align="right" style={{ marginTop: "-5px" }}>
                              {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                (cart.find(order => order.id === item.id).quantity * cart.find(order => order.id === item.id).defaultPrice * currencyFactor) + currencySymbol : ""
                              }
                            </div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </div>
                  )
                })
              }
            </ListGroup>

          </Card>

        </Col >

      </Row >
    </Container >
  );
}
