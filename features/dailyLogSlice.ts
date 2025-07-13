import { dailyLogInterface, initDailyLog } from "@/components/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: dailyLogInterface = initDailyLog();

const dailyLogSlice = createSlice({
  name: "dailyLog",
  initialState,
  reducers: {
    setDailyLog: (state, action: PayloadAction<dailyLogInterface>) => {
      return action.payload;
    },
    updateLogField: (
      state,
      action: PayloadAction<Partial<dailyLogInterface>>
    ) => {
      Object.assign(state, action.payload);
    },
    resetDailyLog:()=>initDailyLog()
  },
});


export const { setDailyLog, updateLogField,resetDailyLog } = dailyLogSlice.actions;
export default dailyLogSlice.reducer;