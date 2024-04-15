import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeCredentials } from './authSlice.ts';

const baseQuery = fetchBaseQuery({
    baseUrl: "/",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include"
  });
  
  async function baseQueryWithAuth(args:any, api:any, extra:any) {
    const result = await baseQuery(args, api, extra);
    // Dispatch the logout action on 401.
    if (result.error && result.error.status === 401) {
      // api.dispatch(removeCredentials());
    }
    return result;
  }
  
  export const apiSlice = createApi({
    baseQuery: baseQueryWithAuth, // Use the customized baseQuery
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}),
  });
