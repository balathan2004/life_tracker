import { AuthResponseConfig } from "@/components/interfaces";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: { data },
      }),
    }),
    register: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: { data },
      }),
    }),
    resetPassword: builder.mutation<
      AuthResponseConfig,
      { email: string }
    >({
      query: (data) => ({
        url: "auth/reset_password",
        method: "POST",
        body: { data },
      }),
    }),
    getAccessToken: builder.mutation<AuthResponseConfig, string>({
      query: (refreshToken) => ({
        url: "auth/refreshToken",
        method: "POST",
        body: { data: { refreshToken } },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAccessTokenMutation,
  useResetPasswordMutation
} = authApi;
