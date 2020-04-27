import { createSlice } from '@reduxjs/toolkit';

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    value: 0,
    menu: [],
    cart: [],
    loading: false,
    currencyCode: "EUR",
    currencySymbol: "€",
    currencyFactor: 1,
    subTotal: 0
  },
  reducers: {
    add: (state, action) => {
      const item = state.menu.filter(item => item.id === action.payload)
      let crustIndex = item[0].crust.findIndex(ele => ele.crustId === item[0].selectedCrustId)
      if (crustIndex === -1)
        crustIndex = 0;
      state.cart.push({
        ...item[0], quantity: 1, defaultPrice: item[0].crust[crustIndex].sizes[0].price
        , price: item[0].crust[crustIndex].sizes[0].price
        , crustName: item[0].crust[crustIndex].name
        , crustSize: item[0].crust[crustIndex].sizes[0].name
        , selectedCrustIndex: crustIndex
      });

      state.subTotal = state.subTotal + item[0].crust[crustIndex].sizes[0].price;

    },
    setProducts: (state, action) => {
      state.menu = action.payload;
      state.loading = true;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading
    },
    updateCurrency: (state, action) => {
      if (action.payload.label === "EUR") {
        state.currencyCode = "EUR";
        state.currencySymbol = "€";
        state.currencyFactor = 1;
      }
      else if (action.payload.label === "USD") {
        state.currencyCode = "USD";
        state.currencySymbol = "$";
        state.currencyFactor = 1.08;
      }
    },
    increaseQuantity: (state, action) => {
      const id = state.cart.findIndex(ele => ele.id === action.payload);
      if (state.cart[id] && state.cart[id].quantity) {
        state.cart[id].quantity = state.cart[id].quantity + 1;
      }
      state.subTotal = state.subTotal + state.cart[id].defaultPrice;
    },
    decreaseQuantity: (state, action) => {
      let id = state.cart.findIndex(ele => ele.id === action.payload);
      if (state.cart[id] && state.cart[id].quantity) {
        state.cart[id].quantity = state.cart[id].quantity - 1;
      }
      state.subTotal = state.subTotal - state.cart[id].defaultPrice;
      if (state.cart[id] && state.cart[id].quantity === 0) {
        state.cart = state.cart.filter(item => item.id !== action.payload)
      }

    },
    selectCrust: (state, action) => {

      let cartId = state.cart.findIndex(ele => ele.id === action.payload.item);
      let menuId = state.menu.findIndex(ele => ele.id === action.payload.item);
      let crustIndex = state.menu[menuId].crust.findIndex(ele => ele.crustId === action.payload.value)
      let quantity = 0;
      if (cartId !== -1) {
        quantity = state.cart[cartId].quantity;
      }
      state.subTotal = state.subTotal +
        ((state.menu[menuId].crust[crustIndex].sizes[0].price * quantity)
          -
          (state.menu[menuId].defaultPrice * quantity));

      state.menu[menuId] = {
        ...state.menu[menuId], selectedCrustId: action.payload.value,
        selectedCrustIndex: crustIndex,
        defaultPrice: state.menu[menuId].crust[crustIndex].sizes[0].price,
      };

      if (cartId !== -1) {
        // crustIndex = state.cart[cartId].crust.findIndex(ele => ele.crustId === action.payload.value)
        state.cart[cartId] = {
          ...state.cart[cartId], selectedCrustId: action.payload.value,
          crustName: action.payload.label,
          defaultPrice: state.menu[menuId].crust[crustIndex].sizes[0].price,
          crustSize: state.menu[menuId].crust[crustIndex].sizes[0].name
        };
      }
    },
    selectSize: (state, action) => {

      let cartId = state.cart.findIndex(ele => ele.id === action.payload.item);
      let menuId = state.menu.findIndex(ele => ele.id === action.payload.item);
      const selectedCrustIndex = state.menu[menuId].selectedCrustIndex || 0;
      let quantity = 0;
      if (cartId !== -1) {
        quantity = state.cart[cartId].quantity;
      }
      state.subTotal = state.subTotal +
        ((state.menu[menuId].crust[selectedCrustIndex].sizes[action.payload.value].price * quantity)
          - (state.menu[menuId].defaultPrice * quantity));
      state.menu[menuId] = {
        ...state.menu[menuId],
        defaultPrice: state.menu[menuId].crust[selectedCrustIndex].sizes[action.payload.value].price,
        crustSize: state.menu[menuId].crust[selectedCrustIndex].sizes[action.payload.value].name
      };
      if (cartId !== -1) {
        // crustIndex = state.cart[cartId].crust.findIndex(ele => ele.crustId === action.payload.value)
        state.cart[cartId] = {
          ...state.cart[cartId],
          defaultPrice: state.menu[menuId].crust[selectedCrustIndex].sizes[action.payload.value].price,
          crustSize: state.menu[menuId].crust[selectedCrustIndex].sizes[action.payload.value].name
        };
      }
    }
  },
});

export const { add, setProducts, toggleLoading, increaseQuantity, decreaseQuantity
  , selectCrust, selectSize ,updateCurrency} = pizzaSlice.actions;
export const selectLoading = state => state.pizza.loading;
export const selectMenu = state => state.pizza.menu;
export const selectCart = state => state.pizza.cart;
export const selectCurrencySymbol = state => state.pizza.currencySymbol;
export const selectCurrencyFactor = state => state.pizza.currencyFactor;
export const selectSubTotal = state => state.pizza.subTotal;
export const selectCurrencyCode = state => state.pizza.currencyCode;
export default pizzaSlice.reducer;
