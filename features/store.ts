// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dailyLogReducer from '../features/dailyLogSlice';
import { dailyLogLogger } from './dispatchActions';

export const store = configureStore({
  reducer: {
    dailyLog: dailyLogReducer,
  },
  middleware:(getDefaultMiddelware)=>
    getDefaultMiddelware().concat(dailyLogLogger)
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
