import { createSlice } from '@reduxjs/toolkit';

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    value: 0,
    menu: [],
    order: [],
    loading: false
  },
  reducers: {
    add: (state, action) => {
      state.order.push({ ...action.payload, quantity: 1 });
    },
    setProducts: (state, action) => {
      state.menu = action.payload;
      state.loading = true;
    },
    toggleLoading(state) {
      state.loading = !state.loading
    },
  },
});

export const {  add, setProducts, toggleLoading } = pizzaSlice.actions;
export const selectLoading = state => state.pizza.loading;
export default pizzaSlice.reducer;
