export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api.example.com';
export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const USERS_URL = `${BASE_URL}/api/users`;
export const PAYPAL_URL = `${BASE_URL}/api/paypal`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;