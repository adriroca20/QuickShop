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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path="product/:id" element={<ProductScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path="cart" element={<CartScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path='login' element={<LoginScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path='register' element={<RegisterScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path="*" element={<HomeScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path='shipping' element={<ShippingScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path='payment' element={<PaymentScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path='placeorder' element={<PlaceOrderScreen />} errorElement={<NotFoundScreen/>}/>
        <Route path='order/:id' element={<PlaceOrderScreen />} errorElement={<NotFoundScreen/>}/>
        {/* <Route path="" element={<PrivateRoute/>}>
            <Route path='shipping' element={<ShippingScreen />} errorElement={<NotFoundScreen/>}/>
        </Route> */}
      </Route>,
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
