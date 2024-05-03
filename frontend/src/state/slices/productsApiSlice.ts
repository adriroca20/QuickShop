import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";
import { IProduct } from "@/interfaces/IProduct";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: PRODUCTS_URL,
                params: { keyword, pageNumber },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),
        getProductById: builder.query<IProduct, string>({
            query: (id) => (
                {
                    url: `${PRODUCTS_URL}/${id}`,
                    method: 'GET',
                }
            ),
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => (
                {
                    url: `${PRODUCTS_URL}/${id}`,
                    method: 'DELETE',
                }
            ),
        }),
        createProduct: builder.mutation<void, void>({
            query: () => (
                {
                    url: PRODUCTS_URL,
                    method: 'POST',
                }
            ),
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => `${PRODUCTS_URL}/top`,
            keepUnusedDataFor: 5,
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useDeleteProductMutation, useCreateProductMutation, useGetTopProductsQuery, useUpdateProductMutation, useUploadProductImageMutation} = productsApiSlice;