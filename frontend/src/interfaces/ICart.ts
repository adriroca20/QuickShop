import { ICartItem } from "./ICartItem";

export interface ICart {
    cartItems: ICartItem[];
    totalPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalItems: number;
    itemsPrice: number;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
}