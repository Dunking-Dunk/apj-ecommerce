import { createSlice } from "@reduxjs/toolkit";

const cartsReducer = createSlice({
  name: "products",
  initialState: window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart"))
    : {
        carts: [],
        subTotal: 0,
        totalItem: 0,
      },
  reducers: {
    addToCart: (state, action) => {
      const cart = state.carts.find((cart) => cart.id === action.payload.id);
      if (cart) {
        cart.quantity++;
      } else state.carts.push(action.payload);
      state.subTotal += action.payload.price;
      state.totalItem += 1;
      window.localStorage.setItem(
        "cart",
        JSON.stringify({
          carts: state.carts,
          subTotal: state.subTotal,
          totalItem: state.totalItem,
        })
      );
    },
    removeFromCart: (state, action) => {
      const cart = state.carts.find((cart) => cart.id === action.payload);
      cart.quantity--;
      if (cart.quantity < 1) {
        state.carts = state.carts.filter((cart) => cart.id !== action.payload);
      }
      state.subTotal -= cart.price;
      state.totalItem -= 1;
      window.localStorage.setItem(
        "cart",
        JSON.stringify({
          carts: state.carts,
          subTotal: state.subTotal,
          totalItem: state.totalItem,
        })
      );
    },
    setCartEmpty: (state) => {
      state.carts = [];
      state.subTotal = 0;
      state.totalItem = 0;
      window.localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, setCartEmpty } = cartsReducer.actions;

export default cartsReducer.reducer;
