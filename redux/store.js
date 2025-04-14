import { configureStore } from '@reduxjs/toolkit';
import nutritionReducer from './slices/nutritionSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    nutrition: nutritionReducer,
    user: userReducer,
  },
}); 