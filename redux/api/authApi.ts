import { AuthUser, DataResponseConfig } from "@/components/interfaces";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      DataResponseConfig<AuthUser>,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: { data },
      }),
    }),
    register: builder.mutation<
      DataResponseConfig<AuthUser>,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: { data },
      }),
    }),
    resetPassword: builder.mutation<
      DataResponseConfig<AuthUser>,
      { email: string }
    >({
      query: (data) => ({
        url: "auth/reset_password",
        method: "POST",
        body: { data },
      }),
    }),
    getAccessToken: builder.mutation<DataResponseConfig<AuthUser>, string>({
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
  useResetPasswordMutation,
} = authApi;
