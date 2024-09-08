import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Register from './Components/Register'
import Login from './Components/Login'
import Products from './Components/Products'
import NotFound from './Components/NotFound'
import Brand from './Components/Brand'
import ProtectedRoute from './Components/ProtectedRoute'
import ForgetPassword from './Components/ForgetPassword'
import ResetPassword from './Components/ResetPassword'
import ProductDetails from './Components/ProductDetails'
import Orders from './Components/Orders'

import DisplayCategories from './Components/DisplayCategories'
import Wishlist from './Components/Wishlist'
import Ourproducts from './Components/Ourproducts'


export default function App() {

  let routes = createHashRouter([
    {
      path: '/', element: <Layout></Layout>, children: [
        { index: true, element: <ProtectedRoute><Home></Home></ProtectedRoute> },
        { path: '/cart', element: <ProtectedRoute><Cart></Cart></ProtectedRoute> },
        { path: '/heart', element:<ProtectedRoute> <Wishlist></Wishlist></ProtectedRoute> },
        { path: '/products', element: <ProtectedRoute><Ourproducts></Ourproducts></ProtectedRoute> },
        { path: '/productdetails/:id/:categoryId', element: <ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute> },
        { path: '/login', element: <Login></Login> },
        { path: '/allorders', element: <ProtectedRoute><Orders></Orders></ProtectedRoute> },
       
        {path:'/forget',element:<ForgetPassword></ForgetPassword>},
        {path:'reset',element:<ResetPassword></ResetPassword>},
        { path: '/register', element: <Register></Register> },
        { path: '/brand', element: <ProtectedRoute><Brand></Brand></ProtectedRoute> },
        { path: '/categories', element:<ProtectedRoute> <DisplayCategories></DisplayCategories> </ProtectedRoute>},
        { path: '*', element: <NotFound></NotFound> }
      ]
    }
  ])

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}
