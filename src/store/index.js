import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './basketSlice';
import shopSlice from './shopSlice';

export const store = configureStore({
  reducer: {
    shop: shopSlice,
    basket: basketSlice
  }
});
