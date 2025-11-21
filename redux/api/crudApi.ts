import {
  dailyLogInterface,
  LogsResponseConfig,
  ResponseConfig,
  SingleLogResponseConfig,
} from "@/components/interfaces";
import { baseApi } from "./baseApi";

export const crudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateDoc: builder.mutation<
      ResponseConfig,
      {  data: dailyLogInterface }
    >({
      query: (payload) => ({
        url: "api/update_doc",
        method: "POST",
        body: payload,
      }),
    }),
    encryptDoc: builder.mutation<
      ResponseConfig,
      {  data: dailyLogInterface }
    >({
      query: (payload) => ({
        url: "api/encrypt_doc",
        method: "POST",
        body: payload,
      }),
    }),
    getSingleLog: builder.query<SingleLogResponseConfig,  string >({
      query: (doc_id) => ({
        url: `api/get_my_dailylog/${doc_id}`,
      }),
    }),

    getAllDocs: builder.query<LogsResponseConfig, void>({
      query: () => ({
        url: `api/get_docs`,
      }),
    }),
  }),
});

export const {
  useUpdateDocMutation,
  useEncryptDocMutation,
  useGetAllDocsQuery,
  useGetSingleLogQuery,
} = crudApi;
