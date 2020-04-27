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
  selectCrust,
  selectSize,
  selectSubTotal,
  updateCurrency,
  selectCurrencyCode
} from './pizzaSlice';
import {
  Card, Button, CardDeck, CardGroup, Dropdown, FormControl,
  Container, Col, Row, ButtonGroup, ListGroup, ListGroupItem,
  Form, Nav
} from 'react-bootstrap';
import { data } from './data';

import { currencySelectStyle, selectStyle } from './styles';


export function Menu() {
  const loading = useSelector(selectLoading);
  const menu = useSelector(selectMenu);
  const cart = useSelector(selectCart);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const currencyFactor = useSelector(selectCurrencyFactor);
  const subTotal = useSelector(selectSubTotal);
  const currencyCode = useSelector(selectCurrencyCode);
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



  const handleChange = (selectedOption) => {
    dispatch(selectCrust(selectedOption));
  };
  const sizeHandleChange = (selectedOption) => {
    dispatch(selectSize(selectedOption));
  };

  const handleCurrencyChange = (selectedOption) => {
    dispatch(updateCurrency(selectedOption));
  }

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
                        <Card.Body style={{paddingBottom:"3px",marginBottom:"5px"}}>
                          <Card.Title style={{ textAlign: "left" ,fontSize:"14px" }}>{item.name} </Card.Title>
                          <Card.Text style={{ textAlign: "left", fontSize: "12px", fontColor: "grey",height:"62px" }} >{item.description}</Card.Text>
                          <Row style={{ marginTop: "-20px" }}>
                            <Col>
                              <label style={{ fontSize: "12px" }}><b>Crust</b></label>
                            </Col>
                            <Col>
                              <label style={{ fontSize: "12px" }}><b>Size</b></label>
                            </Col>
                          </Row>
                          <Row >
                            <Col>
                              <div style={{ width: '90px' }}>
                                <Select
                                  styles={selectStyle}
                                  placeholder="select" align="left"
                                  defaultValue={{
                                    label: item.crust[0].name
                                    , value: item.crust[0].crustId
                                  }}
                                  onChange={(e) => handleChange({ ...e, item: item.id })}
                                  options={
                                    item.crust.map(crust => {
                                      return { label: crust.name, value: crust.crustId }
                                    })
                                  }
                                >
                                </Select>
                              </div>
                            </Col>
                            <Col>
                              <Select
                                styles={selectStyle}
                                placeholder="select" align="left"
                                value={{
                                  label: item.crust[item.selectedCrustIndex || 0].sizes[0].name
                                  , value: 0
                                }}
                                defaultValue={{
                                  label: item.crust[item.selectedCrustIndex || 0].sizes[0].name
                                  , value: 0
                                }}
                                onChange={(e) => sizeHandleChange({ ...e, item: item.id })}
                                options={
                                  item.crust[item.crust.findIndex(ele => ele.crustId === item.selectedCrustId)].sizes.map((size, index) => {
                                    return { label: size.name, value: index }
                                  })
                                }
                              >

                              </Select>
                            </Col>
                          </Row>
                          <hr style={{ padding: "0px", margin: "0px", paddingBottom:"10px" }}></hr>
                          <Row >
                            <Col sm="5">
                              <div align="left" style={{ marginTop: "3px" }}>
                                {currencySymbol + Math.round(item.defaultPrice * currencyFactor)}
                              </div>
                            </Col>
                            <Col sm="7">
                              <div align="right">
                                {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                  <ButtonGroup aria-label="Basic example" >
                                    <Button size="sm" variant="link" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                    <Button size="sm" disabled variant="light">{cart.find(order => order.id === item.id).quantity}</Button>
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
        <Col sm={4}  >
          <Card style={{ width: '15rem', maxHeight: "450px" }} >
            <Card.Header>
              <Row>
                <Col sm={8}>
                  Change Currency
                      </Col>
                <Col sm={4}>
                  <div style={{ width: '60px' }}>
                    <Select align="right"
                      styles={currencySelectStyle}
                      placeholder="select"
                      value={{
                        label: currencyCode
                        , value: currencyCode === "EUR" ? 1 : 1.08
                      }}
                      defaultValue={{
                        label: "EUR"
                        , value: 1
                      }}
                      onChange={handleCurrencyChange}
                      options={
                        [
                          { label: "EUR", value: 1 },
                          { label: "USD", value: 1.08 },
                        ]
                      }
                    >
                    </Select>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <ListGroup className="list-group-flush" style={{ paddingTop: "0px", maxHeight: "400px", overflow: "scroll", overflowX: "hidden", overflowY: "auto" }}>
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
                      <ListGroupItem >
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
                                  <Button size="sm" disabled variant="light">{cart.find(order => order.id === item.id).quantity}</Button>
                                  <Button size="sm" variant="link" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                </ButtonGroup>
                                :
                                ""
                              }
                            </div>
                          </Col>
                          <Col sm={9} style={{ marginTop: "-3px" }}>
                            <div align="right" style={{ marginTop: "-5px" }}>
                              {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                currencySymbol + Math.round(cart.find(order => order.id === item.id).quantity * cart.find(order => order.id === item.id).defaultPrice * currencyFactor) : ""
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
            {
              cart.length > 0 ?
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col align="left" sm={7}>
                        Sub Total
                      </Col>
                      <Col align="right" sm={5}>
                        {currencySymbol + Math.round(subTotal * currencyFactor)}
                      </Col>
                    </Row>

                  </Card.Title>
                </Card.Body> : ""
            }
          </Card>

        </Col >

      </Row >
    </Container >
  );
}
