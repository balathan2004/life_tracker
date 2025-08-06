import { allDocResponseConfig, dailyLogInterface, ResponseConfig } from '@/components/interfaces';
import { baseApi } from './baseApi';

export const crudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    updateDoc:builder.mutation<ResponseConfig,{uid:string,data:dailyLogInterface}>({
      query: (payload) => ({
        url: 'api/update_doc',
        method: 'POST',
        body: payload,
      }),
    }),

     getAllDocs:builder.query<allDocResponseConfig,{uid:string}>({
      query: ({uid}) => ({
        url: `api/get_docs?userId=${uid}`,


      }),
    }),

  }),
  overrideExisting: false, // optional
});

export const {
  useUpdateDocMutation,
  useLazyGetAllDocsQuery
} = crudApi;
