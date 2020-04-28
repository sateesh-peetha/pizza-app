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
    selectCurrencyCode,
    updateCustomerDetails,
    selectCustomerDetails,
    selectShowCustomerDetails,
    toggleModalBox
} from './pizzaSlice';
import {
    Card, Button, CardDeck, CardGroup, Dropdown, FormControl,
    Container, Col, Row, ButtonGroup, ListGroup, ListGroupItem,
    Form, Nav, Modal, Alert
} from 'react-bootstrap';

import { currencySelectStyle, selectStyle } from './styles';
import { Trash } from 'react-bootstrap-icons';

export function Cart() {
    const loading = useSelector(selectLoading);
    const menu = useSelector(selectMenu);
    const cart = useSelector(selectCart);
    const currencySymbol = useSelector(selectCurrencySymbol);
    const currencyFactor = useSelector(selectCurrencyFactor);
    const subTotal = useSelector(selectSubTotal);
    const currencyCode = useSelector(selectCurrencyCode);
    const customerDetails = useSelector(selectCustomerDetails);
    const showCustomerDetails = useSelector(selectShowCustomerDetails);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (selectedOption) => {
        dispatch(selectCrust(selectedOption));
    };
    const sizeHandleChange = (selectedOption) => {
        dispatch(selectSize(selectedOption));
    };

    const handleCurrencyChange = (selectedOption) => {
        dispatch(updateCurrency(selectedOption));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target.elements;
        const customerDetails = {
            firstName: form.firstName.value,
            secondName: form.lastName.value,
            phone: form.phoneNo.value,
            address1: form.address1.value,
            address2: form.address2.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value
        }
        dispatch(updateCustomerDetails(customerDetails));
        dispatch(toggleModalBox({ name: "showCustomerDetails" }));
        const order = {
            customerDetails: customerDetails,
            orderDetails: cart,
            orderCurrencyCode: currencyCode
        };
        const orderRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(order)
        };
        try {
            const results = await fetch('https://wuk2cfdbo8.execute-api.eu-central-1.amazonaws.com/v1/create-order', orderRequest);
            if (results.ok) {
                setShow(true)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const OrderStatus = (props) => {
        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Order Confirmed!</Alert.Heading>
                    <p>
                        Happy Eating! Please comeback.
                </p>
                </Alert>
            )
        }
        else
            return (<div></div>);
    }

    const Order = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Complete Delivery Details
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label size="sm">First Name</Form.Label>
                                <Form.Control size="sm" type="text"
                                    placeholder="Enter First Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label size="sm">Password</Form.Label>
                                <Form.Control type="text" size="sm" placeholder="Enter Second Name" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="phoneNo">
                            <Form.Label size="sm">Phone No</Form.Label>
                            <Form.Control size="sm" placeholder="999888777" />
                        </Form.Group>

                        <Form.Group controlId="address1">
                            <Form.Label size="sm">Address</Form.Label>
                            <Form.Control size="sm" placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group controlId="address2">
                            <Form.Label size="sm">Address 2</Form.Label>
                            <Form.Control size="sm" placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="city">
                                <Form.Label size="sm">City</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>

                            <Form.Group as={Col} size="sm" controlId="state">
                                <Form.Label size="sm">State </Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="zip">
                                <Form.Label size="sm">Zip</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                        </Form.Row>


                        <Button variant="primary" type="submit" >
                            Proceed With Order
  </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Container fluid>
            <OrderStatus />
            <Order
                show={showCustomerDetails}
                onHide={() => dispatch(toggleModalBox({ name: "showCustomerDetails" }))}
            />
            <Row>
                <Col sm={8}  >
                    <Card style={{ width: '50rem', maxHeight: "750px" }} >
                        <ListGroup className="list-group-flush" style={{ paddingTop: "0px", maxHeight: "600px", overflow: "scroll", overflowX: "hidden", overflowY: "auto" }}>
                            {cart.length === 0 ?
                                <div align="center" style={{ paddingTop: "50px" }}>
                                    <h6>YOUR CART IS EMPTY </h6>
                                    <p><a href="#menu">Please add some items from the menu. </a></p>
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
                                                    <Col sm={6} style={{ marginTop: "-3px", padding: 0 }}>
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
                                                                        <Button size="lg" variant="light" onClick={() => dispatch(decreaseQuantity(item.id))}>{cart.find(order => order.id === item.id).quantity === 1 ? <Trash color="red"></Trash> : "-"}</Button>
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
                    {cart.length > 0 ?
                        <Col sm={4}>

                            <Card style={{ width: '15rem', maxHeight: "450px", marginLeft: "15px" }} >
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
                                <h5 align="left" style={{ marginLeft: "40px" }}>Payment Details</h5>
                                {
                                    cart.length > 0 ?
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: "14px" }}>
                                                <Row>
                                                    <Col align="left" sm={8}>
                                                        Sub Total
                      </Col>
                                                    <Col align="right" sm={4}>
                                                        {currencySymbol + Math.round(subTotal * currencyFactor)}
                                                    </Col>
                                                </Row>

                                            </Card.Title>
                                            <Card.Title style={{ fontSize: "14px" }}>
                                                <Row>
                                                    <Col align="left" sm={8}>
                                                        Delivery Fee
                      </Col>
                                                    <Col align="right" sm={4}>
                                                        {currencySymbol + Math.round(10)}
                                                    </Col>
                                                </Row>

                                            </Card.Title>
                                            <Card.Title style={{ fontSize: "14px" }}>
                                                <Row>
                                                    <Col align="left" sm={8}>
                                                        Grand Total
                      </Col>
                                                    <Col align="right" sm={4}>
                                                        {currencySymbol + (Math.round(subTotal * currencyFactor) + Math.round(10))}
                                                    </Col>
                                                </Row>

                                            </Card.Title>
                                            <Card.Title>
                                                <Button variant="light" block onClick={() => dispatch(toggleModalBox({ name: "showCustomerDetails" }))}>
                                                    Place Order
                                            </Button>

                                            </Card.Title>
                                        </Card.Body> : ""
                                }
                            </Card>

                        </Col >
                        : ""
                    }
                </Col>
            </Row >
        </Container >
    );
}
