import { dailyLogInterface, initDailyLog, User } from "@/components/interfaces";
import { storeData } from "@/components/utils/data_store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { authApi } from "./authApi";

const initialState = {
  user: {} as User,
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
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload.accessToken || "";
      state.user = payload.user;
    },
    updateDailyLog: (
      state,
      { payload }: { payload: Partial<dailyLogInterface> },
    ) => {
      Object.assign(state.dailyLog, payload);
    },
    resetDailyLog: (state) => {
      state.dailyLog = initDailyLog();
    },
    setUser: (state, { payload }: { payload: User }) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.dailyLog = {} as any;
      state.user = {} as any;
      state.accessToken = "";
      AsyncStorage.multiRemove(["refreshToken", "userCred", "dailyLog"]);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log({ payload });
        state.accessToken = payload.data.accessToken || "";
        state.user = payload.data.user as User;
        AsyncStorage.setItem("refreshToken", payload.data.refreshToken || "");
        AsyncStorage.setItem("userCred", JSON.stringify(payload.data.user));
      },
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.data.accessToken || "";
        state.user = payload.data.user as User;
        AsyncStorage.setItem("refreshToken", payload.data.refreshToken || "");
        AsyncStorage.setItem("userCred", JSON.stringify(payload.data.user));
      },
    );
    builder.addMatcher(
      authApi.endpoints.getAccessToken.matchFulfilled,
      (state, { payload }) => {
        console.log("accessed getAccetoken");
        state.accessToken = payload.data.accessToken || "";
        state.user = payload.data.user;
        AsyncStorage.setItem("userCred", JSON.stringify(payload.data.user));
      },
    );
  },
});

export const {
  setDailyLog,
  updateDailyLog,
  resetDailyLog,
  setUser,
  logoutUser,
  setAccessToken,
} = authSlice.actions;
export default authSlice.reducer;

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const setDailylog = (dailyLog: dailyLogInterface) => {
    dispatch(setDailyLog(dailyLog));
  };

  const setUserData = (userData: User) => {
    dispatch(setUser(userData));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const resetDailylog = () => {
    dispatch(resetDailyLog());
  };

  const updateDailylog = (payload: Partial<dailyLogInterface>) => {
    dispatch(updateDailyLog(payload));
  };

  useEffect(() => {
    if (authState.dailyLog && Object.keys(authState.dailyLog).length > 0) {
      storeData({ key: "dailyLog", value: authState.dailyLog });
    }
  }, [authState.dailyLog]);

  return {
    ...authState,
    setDailylog,
    resetDailylog,
    updateDailylog,
    setUserData,
    handleLogout,
  };
};
