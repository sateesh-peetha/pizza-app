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
import { Card, Button, CardDeck, CardGroup, Container, Col, Row, ButtonGroup } from 'react-bootstrap';
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
        <Col sm={9}>
          <CardDeck> {
            data.map(item => {
              return (
                <Row>
                  <Col>
                    <div key={item.id}>
                      <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={`./img/${item.image}`} />
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text size="sm">
                            {item.description}
                          </Card.Text>
                          {cart.find(order => order.id === item.id) && cart.find(order => order.id === item.id).quantity > 0 ?
                            <ButtonGroup aria-label="Basic example">
                              <Button variant="secondary" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                              <Button variant="secondary">{cart.find(order => order.id === item.id).quantity}</Button>
                              <Button variant="secondary" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                            </ButtonGroup>
                            :
                            <Button variant="primary" onClick={() => dispatch(add(item.id))}>Add to Cart</Button>
                          }
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
        <Col sm={2}> Car here</Col>

      </Row>
    </Container>
  );
}
