import { ICartItem } from "./ICartItem";

export interface ICart {
    cartItems: ICartItem[];
    totalPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalItems: number;
}