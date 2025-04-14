import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Constants from 'expo-constants';

// Async thunk for fetching food data
export const searchFoods = createAsyncThunk(
  'nutrition/searchFoods',
  async (query) => {
    const api_id = Constants.expoConfig.extra.API_ID;
    const api_key = Constants.expoConfig.extra.API_KEY;

    const response = await fetch(
      `https://trackapi.nutritionix.com/v2/natural/nutrients`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': api_id,
          'x-app-key': api_key,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch food data');
    }

    const data = await response.json();
    return data.foods;
  }
);

const initialState = {
  dailyGoals: {
    calories: 2000,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  currentMeals: [],
  searchResults: [],
  loading: false,
  error: null,
};

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    setDailyGoals: (state, action) => {
      state.dailyGoals = {
        ...state.dailyGoals,
        ...action.payload
      };
    },
    addMeal: (state, action) => {
      const meal = action.payload;
      // Calculate nutrition values if not provided
      if (!meal.protein || !meal.carbs || !meal.fat) {
        meal.protein = meal.protein || 0;
        meal.carbs = meal.carbs || 0;
        meal.fat = meal.fat || 0;
      }
      state.currentMeals.push(meal);
    },
    removeMeal: (state, action) => {
      state.currentMeals = state.currentMeals.filter(
        (meal) => meal.id !== action.payload
      );
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    resetNutrition: (state) => {
      state.currentMeals = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setDailyGoals, 
  addMeal, 
  removeMeal, 
  clearSearchResults,
  resetNutrition 
} = nutritionSlice.actions;

export default nutritionSlice.reducer; 