import { ICart } from "./interfaces/ICart";

export const addDecimals = (num: number) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
}

export const updateCart = (state:ICart)=>{
    state.shippingPrice = addDecimals(state.totalPrice > 100 ? 0 : 100)
    state.taxPrice = addDecimals(Number((0.05 * state.totalPrice).toFixed(2)))
    state.totalPrice = addDecimals(
        state.cartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,0
        ) * 1.15 + state.shippingPrice
    ) 
    state.itemsPrice = addDecimals(
        state.cartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,0
        )
    )
    state.totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    localStorage.setItem("cart", JSON.stringify(state))
}