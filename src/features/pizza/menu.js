import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  setProducts,
  selectLoading,
  selectMenu,
  toggleLoading
} from './pizzaSlice';
import { Card, Button ,CardDeck,CardGroup,Container,Col} from 'react-bootstrap';
import { data } from './data';

export function Menu() {
  const loading = useSelector(selectLoading);
  const menu = useSelector(selectMenu);
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
        response.json().then(function (data) {
          dispatch(setProducts(data))
        });
      }
    ).catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  }

  return (
    <Container>
    <CardGroup> {
    data.map(item => {
      return (
        <Col sm={4}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`./img/${item.image}`} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
    </Card.Text>
            <Button variant="primary">Add to Cart</Button>
          </Card.Body>
        </Card>
        </Col>
      )
    })
  }
  </CardGroup> 
  </Container>
  );
}
