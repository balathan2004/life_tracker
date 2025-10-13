import {
  dailyLogInterface,
  initDailyLog,
  UserDataInterface,
} from "@/components/interfaces";
import { storeData } from "@/components/utils/data_store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { authApi } from "./authApi";

const initialState = {
  userData: {} as UserDataInterface,
  dailyLog: {} as dailyLogInterface,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDailyLog: (state, { payload }: { payload: dailyLogInterface }) => {
      storeData({ key: "dailyLog", value: payload });
      state.dailyLog = payload;
    },
    updateDailyLog: (
      state,
      { payload }: { payload: Partial<dailyLogInterface> }
    ) => {
      Object.assign(state.dailyLog, payload);
    },
    resetDailyLog: (state) => {
      state.dailyLog = initDailyLog();
    },
    setUser: (state, { payload }: { payload: UserDataInterface }) => {
      state.userData = payload;
    },
    logoutUser: (state) => {
      (state.dailyLog = {} as any),
        (state.userData = {} as any),
        AsyncStorage.multiRemove(["refreshToken", "userCred", "dailyLog"]);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log({ payload });
        state.accessToken = payload.accessToken || "";
        state.userData = payload.credentials as UserDataInterface;
        AsyncStorage.setItem("refreshToken", payload.refreshToken || "");
        AsyncStorage.setItem("userCred", JSON.stringify(payload.credentials));
      }
    ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken || "";
          state.userData = payload.credentials as UserDataInterface;
          AsyncStorage.setItem("refreshToken", payload.refreshToken || "");
          AsyncStorage.setItem("userCred", JSON.stringify(payload.credentials));
        }
      );
    builder.addMatcher(
      authApi.endpoints.getAccessToken.matchFulfilled,
      (state, { payload }) => {
        console.log("accessed getAccetoken");
        state.accessToken = payload.accessToken || "";
        state.userData = payload.credentials as UserDataInterface;
        AsyncStorage.setItem("userCred", JSON.stringify(payload.credentials));
      }
    );
  },
});

export const { setDailyLog, updateDailyLog, resetDailyLog, setUser } =
  authSlice.actions;
export default authSlice.reducer;

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const useSetDailyLog = (dailyLog: dailyLogInterface) => {
    dispatch(setDailyLog(dailyLog));
  };

  const setUserData = (userData: UserDataInterface) => {
    dispatch(setUser(userData));
  };

  const useResetDailyLog = () => {
    dispatch(resetDailyLog());
  };

  const useUpdateDailyLog = (payload: Partial<dailyLogInterface>) => {
    dispatch(updateDailyLog(payload));
  };

  useEffect(() => {
    if (authState.dailyLog && Object.keys(authState.dailyLog).length > 0) {
      storeData({ key: "dailyLog", value: authState.dailyLog });
    }
  }, [authState.dailyLog]);

  return { ...authState, useSetDailyLog, useResetDailyLog, useUpdateDailyLog,setUserData };
};
