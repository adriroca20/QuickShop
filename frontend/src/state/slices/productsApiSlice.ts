import exp from "constants";
import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";
import { IProduct } from "@/interfaces/IProduct";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => (
                {
                    url: PRODUCTS_URL,
                    method: 'GET',
                }   
            ),
            keepUnusedDataFor: 5,
        }),
        getProduct: builder.query<IProduct, string>({
            query: (id) => (
                {
                    url: `${PRODUCTS_URL}/${id}`,
                    method: 'GET',
                }
            ),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;