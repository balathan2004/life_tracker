import { getData } from "@/components/utils/data_store";
import { domain_url } from "@/env";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: domain_url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const refreshToken = (await getData("refreshToken")) as string;

    if (!refreshToken) {
      api.dispatch({
        type: "auth/logoutUser",
      });
      return result;
    }

    const refreshResult = (await baseQuery(
      {
        url: "auth/refreshToken",
        method: "POST",
        body: { data: { refreshToken } },
      },
      api,
      extraOptions,
    )) as any;

    if (refreshResult) {
      console.log({ refreshResult });
      api.dispatch({
        type: "auth/setAccessToken",
        payload: {
          accessToken: refreshResult.data.accessToken,
          credentials: refreshResult.data.credentials,
        },
      });
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logoutUser" });
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}), // empty initially
  tagTypes: ["logs", "account"],
});
