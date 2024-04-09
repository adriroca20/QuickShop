import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
        getUsers: builder.mutation({
            query: () =>({
                url: `${USERS_URL}/`,
                method: "GET",
            })
        }),
        getUserById: builder.query({
            query: (id) => `${USERS_URL}/${id}`,
        }),
        register: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/register`,
                method: "POST",
                body,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `${USERS_URL}/users/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/users/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useLoginMutation,useLogoutMutation, useGetUsersMutation, useGetUserByIdQuery, useRegisterMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApiSlice;