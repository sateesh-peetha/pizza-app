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

export function Cart() {
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
                <Col sm={8}  >
                    <Card style={{ width: '50rem', maxHeight: "750px" }} >
                        <ListGroup className="list-group-flush" style={{ paddingTop: "0px", maxHeight: "600px", overflow: "scroll", overflowX: "hidden", overflowY: "auto" }}>
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
                                                        <Card.Img variant="left" src={`./img/${item.image}`} width="150px" height="90px" />
                                                    </Col>
                                                    <Col sm={6} style={{ marginTop: "-3px" ,padding:0}}>
                                                        <h5 style={{ textAlign: "left" }}>{item.name}</h5>
                                                        <p style={{ textAlign: "left", fontSize: "14px", fontColor: "grey", marginTop: "-7px" }} >{item.description}</p>
                                                        <p style={{ textAlign: "left", fontSize: "14px", fontColor: "grey", marginTop: "-9px" }}> <b>{item.crustSize} | {item.crustName}</b></p>
                                                    </Col>

                                                    <Col sm={2}>
                                                        <Row>
                                                            <Col sm={9} style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
                                                                <div align="right" style={{ marginTop: "-5px" }}>
                                                                    {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                                                        currencySymbol + Math.round(cart.find(order => order.id === item.id).quantity * cart.find(order => order.id === item.id).defaultPrice * currencyFactor) : ""
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <div align="right" style={{ marginTop: "20px" }}>
                                                                {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                                                    <ButtonGroup aria-label="Quantity" >
                                                                        <Button size="lg" variant="light" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                                                        <Button size="lg" disabled variant="light">{cart.find(order => order.id === item.id).quantity}</Button>
                                                                        <Button size="lg" variant="light" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                                                    </ButtonGroup>
                                                                    :
                                                                    ""
                                                                }
                                                            </div>
                                                        </Row>
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
                <Col sm={4}>
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
                                        <Card.Title>
                                            <Row>
                                                <Col align="left" sm={7}>
                                                    Delivery Fee
                      </Col>
                                                <Col align="right" sm={5}>
                                                    {currencySymbol + Math.round(10)}
                                                </Col>
                                            </Row>

                                        </Card.Title>
                                        <Card.Title>
                                            <Row>
                                                <Col align="left" sm={7}>
                                                    Total
                      </Col>
                                                <Col align="right" sm={5}>
                                                    {currencySymbol + (Math.round(subTotal * currencyFactor) + Math.round(10))}
                                                </Col>
                                            </Row>

                                        </Card.Title>
                                        <Card.Title>
                                            <Button variant="light" block>
                                                Place Order
                                            </Button>

                                        </Card.Title>
                                    </Card.Body> : ""
                            }
                        </Card>

                    </Col >
                </Col>
            </Row >
        </Container >
    );
}
