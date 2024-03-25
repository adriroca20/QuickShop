import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants.ts';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/products',
        }),
        getProduct: builder.query({
            query: (id) => `/api/products/${id}`,
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/api/orders',
                method: 'POST',
                body: order,
            }),
        }),
    }),
});
