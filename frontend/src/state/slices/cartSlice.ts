import { ICart } from "@/interfaces/ICart";
import { ICartItem } from "@/interfaces/ICartItem";
import { updateCart } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";

const storageItem = localStorage.getItem("cart")
const initialState:ICart = storageItem ? JSON.parse(storageItem) : { 
    cartItems: [],
    totalPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalItems: 0,
    shippingAddress: {},
    paymentMethod: "PayPal",
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
            updateCart(state)
        },
        updateCartItem: (state, action) => {
            const item:ICartItem = action.payload;
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.product._id === item.product._id
            );
            if (existingItem) {
                existingItem.quantity = item.quantity;
            }
            updateCart(state)
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            console.log(itemId)
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.product._id !== itemId
            );
            updateCart(state)
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        }
    },
});
export const { addToCart, removeFromCart, saveShippingAddress, clearCart, updateCartItem, savePaymentMethod} = cartSlice.actions;
export default cartSlice.reducer;