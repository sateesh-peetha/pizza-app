import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../features/pizza/pizzaSlice';

export default configureStore({
  reducer: {
    pizza: pizzaReducer,
  },
});
