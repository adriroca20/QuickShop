import { IUser } from "./IUser";

export interface IOrderItem {
    name: string;
    cuantity: number;
    image: string;
    price: number;
    product: string;
  }
  
  interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  interface PaymentResult {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
  }
  
  export interface IOrder {
    user:IUser;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult?: PaymentResult;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt?: string;
    updatedAt?: string;
    _id: string;
  }