import { AuthResponseConfig } from "@/components/interfaces";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    getAccessToken: builder.mutation<AuthResponseConfig,  string >({
      query: (payload) => ({
        url: "auth/refreshToken",
        method: "POST",
        body: { refreshToken:payload },
      }),
    }),
  }),

});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAccessTokenMutation,
} = authApi;
