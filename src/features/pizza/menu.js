import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  setProducts,
  selectLoading,
  selectMenu,
  toggleLoading
} from './pizzaSlice';
import { Card, Button } from 'react-bootstrap';

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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Pizza</Card.Title>
        <Card.Text>
          Pizza Description
    </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
