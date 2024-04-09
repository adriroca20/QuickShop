import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo")
const initialState = {
    userInfo: userInfo ? JSON.parse(userInfo) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        removeCredentials(state) {
            state.userInfo = null;
            localStorage.clear();
        }
    },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;