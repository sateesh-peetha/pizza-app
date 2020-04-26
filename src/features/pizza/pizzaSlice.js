import { createSlice } from '@reduxjs/toolkit';

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    value: 0,
    menu: [],
    cart: [],
    loading: false
  },
  reducers: {
    add: (state, action) => {
      const item = state.menu.filter(item => item.id === action.payload)
      state.cart.push({ ...item[0], quantity: 1 });
    },
    setProducts: (state, action) => {
      state.menu = action.payload;
      state.loading = true;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading
    },
    increaseQuantity: (state, action) => {
      const id = state.cart.findIndex(ele => ele.id === action.payload);
      if (state.cart[id] && state.cart[id].quantity)
        state.cart[id].quantity = state.cart[id].quantity + 1;
    },
    decreaseQuantity: (state, action) => {
      let id = state.cart.findIndex(ele => ele.id === action.payload);
      if (state.cart[id] && state.cart[id].quantity)
        state.cart[id].quantity = state.cart[id].quantity - 1;

      if (state.cart[id] && state.cart[id].quantity === 0) {
         state.cart = state.cart.filter(item=>item.id!=action.payload)
      }
    }
  },
});

export const { add, setProducts, toggleLoading, increaseQuantity, decreaseQuantity } = pizzaSlice.actions;
export const selectLoading = state => state.pizza.loading;
export const selectMenu = state => state.pizza.menu;
export const selectCart = state => state.pizza.cart;
export default pizzaSlice.reducer;
