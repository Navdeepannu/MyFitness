import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    age: null,
    height: null,
    weight: null,
    goal: null,
  },
  stats: {
    mealsLogged: 0,
    workoutsCompleted: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    incrementMealsLogged: (state) => {
      state.stats.mealsLogged += 1;
    },
    decrementMealsLogged: (state) => {
      state.stats.mealsLogged -= 1;
    },
    incrementWorkoutsCompleted: (state) => {
      state.stats.workoutsCompleted += 1;
    },
  },
});

export const {
  updateProfile,
  updateStats,
  incrementMealsLogged,
  decrementMealsLogged,
  incrementWorkoutsCompleted,
} = userSlice.actions;

export default userSlice.reducer;
