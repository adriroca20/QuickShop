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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />}/>
        <Route path="product/:id" element={<ProductScreen />}/>
        <Route path="cart" element={<CartScreen />}/>
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
