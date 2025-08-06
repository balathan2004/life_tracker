import { domain_url } from '@/env';


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: domain_url }),
  endpoints: () => ({}), // empty initially
});
