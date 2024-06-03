import { createSlice } from '@reduxjs/toolkit';
import { CartState } from './types';

const initialState: CartState = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    removefromCart: (state, action) => {
      delete state[action.payload];
    },
    clearCart: state => initialState,
  },
});

export const { addToCart, removefromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
