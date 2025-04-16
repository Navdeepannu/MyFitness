import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workoutLogs: [],
  currentWorkout: null,
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkoutLog: (state, action) => {
      state.workoutLogs.push({
        ...action.payload,
        id: Date.now(),
        date: new Date().toISOString(),
      });
    },
    setCurrentWorkout: (state, action) => {
      state.currentWorkout = action.payload;
    },
    clearCurrentWorkout: (state) => {
      state.currentWorkout = null;
    },
    deleteWorkoutLog: (state, action) => {
      state.workoutLogs = state.workoutLogs.filter(
        (log) => log.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addWorkoutLog,
  setCurrentWorkout,
  clearCurrentWorkout,
  deleteWorkoutLog,
  setLoading,
  setError,
} = workoutSlice.actions;

export default workoutSlice.reducer;
