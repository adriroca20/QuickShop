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
        getUsers: builder.query({
            query: () => `${USERS_URL}/`,
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
        getProfile: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: "GET",
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation,useLogoutMutation, useGetUsersQuery, useGetUserByIdQuery, useRegisterMutation, useUpdateUserMutation, useDeleteUserMutation, useGetProfileMutation, useUpdateUserProfileMutation } = usersApiSlice;