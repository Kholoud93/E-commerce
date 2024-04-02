import React, { Component } from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Category from './components/Category/Category';
import Details from './components/Details/Details';
import Products from './components/Products/Products';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './context/UserContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/allorders/allorders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';


const router = createHashRouter([
  { path: '/', element: <Layout />, children: [
      { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute>},
      { path: '', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'brands', element:<ProtectedRoute> <Brands /> </ProtectedRoute>},
      { path: 'cart', element:<ProtectedRoute> <Cart /> </ProtectedRoute> },
     
      { path: 'category', element: <ProtectedRoute><Category /> </ProtectedRoute> },
      { path: 'details/:id', element: <ProtectedRoute><Details /> </ProtectedRoute> },
      { path: 'products', element:<ProtectedRoute><Products /> </ProtectedRoute> },
      { path: 'checkout', element:<ProtectedRoute><Checkout/> </ProtectedRoute> },
      { path: 'allorders', element:<ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'forgetPass', element: <ForgetPassword/> },
      { path: 'resetPass', element: <ResetPassword/>},
      { path: 'signin', element: <Signin/> },
      { path: 'signup', element: <Signup /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

export default class App extends Component {
  render() {
    return (

      <CartContextProvider>
<UserContextProvider>

  <RouterProvider router={router}></RouterProvider>


<ToastContainer theme='colored'/>
</UserContextProvider>

      </CartContextProvider>
     







 

    
         );
  }
}


