import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen.tsx'
import { ProductScreen } from './screens/ProductScreen.tsx'
import { Provider } from 'react-redux'
import store from './state/store.ts'
import { CartScreen } from './screens/CartScreen.tsx'
import { LoginScreen } from './screens/LoginScreen.tsx'
import { RegisterScreen } from './screens/RegisterScreen.tsx'
import { NotFoundScreen } from './screens/NotFoundScreen.tsx'
import { ShippingScreen } from './screens/ShippingScreen.tsx'
import { PrivateRoute } from './components/PrivateRoute.tsx'
import { PaymentScreen } from './screens/PaymentScreen.tsx'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen.tsx'
import OrderScreen from './screens/OrderScreen.tsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { ProfileScreen } from './screens/ProfileScreen.tsx'
import { AdminRoute } from './components/AdminRoute.tsx'
import OrderListScreen from './screens/admin/OrderListScreen.tsx'
import ProductEditScreen from './screens/admin/ProductEditScreen.tsx'
import ProductListScreen from './screens/admin/ProductListScreen.tsx'
import UserEditScreen from './screens/admin/UserEditScreen.tsx'
import UserListScreen from './screens/admin/UserListScreen.tsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
      <Route path='*' element={<NotFoundScreen />} />
    </Route>,
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{
        clientId: "AejT_5-pip0aLX_xVf5OhxuWNAAVNj2aM3HzDQYRd8PIMYBy_f8pL6hx2uTqJhqpJ6FzgXH2i19TFPi0",
        currency: 'USD',
        intent: 'capture',
      }}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
