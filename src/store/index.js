import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './basketSlice';
import shopSlice from './shopSlice';
import buyerSlice from './buyerSlice';

export const store = configureStore({
  reducer: {
    shop: shopSlice,
    basket: basketSlice,
    buyer: buyerSlice
  }
});
