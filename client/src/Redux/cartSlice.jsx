import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  price: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    storeCart: (state, action) => {
      console.log(action.payload);

      state.cart = action.payload;
    },
    totalPrice: (state, action) => {
      state.price = action.payload.price;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeCart, totalPrice } = cartSlice.actions;

export default cartSlice.reducer;
