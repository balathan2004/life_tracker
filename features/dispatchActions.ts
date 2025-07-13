import { dailyLogInterface } from "@/components/interfaces";
import { storeData } from "@/components/utils/data_store";
import { Dispatch, Middleware, UnknownAction } from "@reduxjs/toolkit";
import { UseSelector } from "react-redux";
import { resetDailyLog, setDailyLog, updateLogField } from "./dailyLogSlice";
import { RootState } from "./store";

export const useDailyLog = (useSelector:UseSelector<RootState>) => {
  return useSelector((state: RootState) => state.dailyLog);
};

export const useUpdateDailyLog = (
  dispatch: Dispatch<UnknownAction>,
  data: Partial<dailyLogInterface>
) => {
  dispatch(updateLogField(data));
};

export const useResetDailyLog = (
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(resetDailyLog());
};

export const useSetDailyLog = (
  dispatch: Dispatch<UnknownAction>,
  dailyLog: dailyLogInterface
) => {
  dispatch(setDailyLog(dailyLog));
};


export const dailyLogLogger:Middleware=(storeAPI)=>(next)=>(action:any)=>{
  const result =next(action)

  if(action.type.startsWith('dailyLog/')){
     storeData({ key: "dailyLog", value: storeAPI.getState().dailyLog });
  }
  return result
}