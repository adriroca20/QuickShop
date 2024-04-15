import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDERS_URL,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => `${ORDERS_URL}/${orderId}`,
      keepUnusedDataFor: 5,
    }),
    getPaypalClientId: builder.query({
      query: () => `${ORDERS_URL}/config/paypal`,
    }),
    payOrder: builder.mutation({
      query: ({orderId, paymentResult}) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useCreateOrderMutation, useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation} = ordersApiSlice;