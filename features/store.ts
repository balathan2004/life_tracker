// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dailyLogReducer from '../features/dailyLogSlice';
import { baseApi } from './api/baseApi';
import { dailyLogLogger } from './dispatchActions';

export const store = configureStore({
  reducer: {
    dailyLog: dailyLogReducer,
     [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware:(getDefaultMiddelware)=>
    getDefaultMiddelware().concat(dailyLogLogger,baseApi.middleware)
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;