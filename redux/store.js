import { configureStore } from '@reduxjs/toolkit';
import nutritionReducer from './slices/nutritionSlice';
import userReducer from './slices/userSlice';
import workoutReducer from './slices/workoutSlice';

export const store = configureStore({
  reducer: {
    nutrition: nutritionReducer,
    user: userReducer,
    workout: workoutReducer,
  },
}); 