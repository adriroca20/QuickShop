import { ICart } from "@/interfaces/ICart";
import { ICartItem } from "@/interfaces/ICartItem";
import { addDecimals, updateCart } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";

const storageItem = localStorage.getItem("cart")
const initialState:ICart = storageItem ? JSON.parse(storageItem) : { 
    cartItems: [],
    totalPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalItems: 0
};



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item:ICartItem = action.payload;
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.product._id === item.product._id
            );
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cartItems = [...state.cartItems, { product: item.product, quantity: item.quantity }]
            }
            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            const item = action.payload;
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.product !== item.product
            );
            state.totalPrice = addDecimals(
                state.cartItems.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,0
                )
            ) * 1.15 + state.shippingPrice
            state.totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
        },
    },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;