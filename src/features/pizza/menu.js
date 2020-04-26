import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  setProducts,
  selectLoading,
  selectMenu,
  toggleLoading,
  selectCart,
  increaseQuantity,
  decreaseQuantity
} from './pizzaSlice';
import { Card, Button, CardDeck, CardGroup,  Container, Col, Row, ButtonGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { data } from './data';

export function Menu() {
  const loading = useSelector(selectLoading);
  const menu = useSelector(selectMenu);
  const cart = useSelector(selectCart);
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

  return (
    <Container fluid>
      <Row>
        <Col sm={8}>
          <CardDeck style={{ display: "flex" }}> {
            data.map(item => {
              return (
                <Row class={"row equal"} style={{ paddingBottom: "5px" }}>
                  <Col>
                    <div key={item.id}>
                      <Card style={{ width: '14rem', height: "100%" }} >
                        <Card.Img variant="top" src={`./img/${item.image}`} />
                        <Card.Body>
                          <Card.Title style={{ textAlign: "left" }}>{item.name}</Card.Title>
                          <Card.Text style={{ textAlign: "left", fontSize: "12px", fontColor: "grey" }} >{item.description}</Card.Text>
                          <ListGroup className="list-group-flush" style={{ paddingTop: "0px" }}>
                            <ListGroupItem style={{ textAlign: "left", height: "0px", marginTop: "-10px", padding: "0px" }}></ListGroupItem>
                            <ListGroupItem>Drop Down Here</ListGroupItem>
                            <ListGroupItem style={{ textAlign: "left", height: "0px", padding: "0px" }}></ListGroupItem>

                          </ListGroup>
                          <div align="right">
                            {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                              <ButtonGroup aria-label="Basic example" >
                                <Button variant="secondary" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                <Button variant="secondary">{cart.find(order => order.id === item.id).quantity}</Button>
                                <Button variant="secondary" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                              </ButtonGroup>
                              :
                              <Button variant="primary" onClick={() => dispatch(add(item.id))}>Add to Cart</Button>
                            }
                          </div>
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
        <Col sm={4}>
          <Card style={{ width: '15rem', height: "100%" }} >
            <ListGroup className="list-group-flush" style={{ paddingTop: "0px" }}>
              {
                cart.map(item => {
                  return (
                    <div key={item.id}>
                      <ListGroupItem>
                        <Row>
                          <Col sm={3}>
                            <Card.Img variant="left" src={`./img/${item.image}`} width="50px" height="50px" />
                          </Col>
                          <Col sm={9}>
                              <h6 style={{ textAlign: "left" }}>{item.name}</h6>
                              <p style={{ textAlign: "left", fontSize: "10px", fontColor: "grey" }} >{item.description}</p>
                            <div align="right">
                              {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                                <ButtonGroup aria-label="Basic example" >
                                  <Button variant="secondary" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                  <Button variant="secondary">{cart.find(order => order.id === item.id).quantity}</Button>
                                  <Button variant="secondary" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                </ButtonGroup>
                                :
                                <Button variant="primary" onClick={() => dispatch(add(item.id))}>Add to Cart</Button>
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
