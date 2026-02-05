import {
  dailyLogInterface,
  DataListResponseConfig,
  DataResponseConfig,
  ResponseConfig,
} from "@/components/interfaces";
import querystring from "query-string";
import { baseApi } from "./baseApi";

export const crudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation<ResponseConfig, { data: dailyLogInterface }>({
      query: ({ data }) => ({
        url: `api/docs/${data.date}`,
        method: "PUT",
        body: { data },
      }),
      invalidatesTags: ["logs"],
    }),
    encrypt: builder.mutation<ResponseConfig, { data: dailyLogInterface }>({
      query: ({ data }) => ({
        url: `api/encrypt/${data.date}`,
        method: "PUT",
        body: { data },
      }),
    }),
    getDocById: builder.query<DataResponseConfig<dailyLogInterface>, string>({
      query: (doc_id) => ({
        url: `api/docs/${doc_id}`,
      }),
    }),

    getDocs: builder.query<DataListResponseConfig<dailyLogInterface>, object>({
      query: (cursor) => {
        const querypayload = querystring.stringify(cursor, {
          skipEmptyString: true,
        });
        return { url: `api/docs?${querypayload}` };
      },
      providesTags: ["logs"],
    }),
  }),
});

export const {
  useUpdateMutation,
  useEncryptMutation,
  useGetDocByIdQuery,
  useGetDocsQuery,
} = crudApi;
