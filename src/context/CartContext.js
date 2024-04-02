import { createContext, useState } from "react";
import axios from 'axios';


 export let CartContext =createContext()

 export default function CartContextProvider(props){
  const [cartNumber,setCartNumber] = useState(0)
  let header = { token : localStorage.getItem('userToken')};



   function addToCart(id){
   return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
  { 
    productId: id
  }
  ,
  {
   headers : header
  }).then((response)=>response)
   .catch((error)=>error)
}


function getCart(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
  {
    headers : header
  }
  ).then((response)=>response)
  .catch((error)=>error)
}

function removeCartItems(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
 { headers: header}
 ).then((response)=>response)
 .catch((error)=>error)
}


function updateProductQuatity(productId , count){
 return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
{
  count : count
 },
 {
  headers : header
 }
 ).then((response)=>response)
 .catch((error)=>error)
}

function deleteUserCart(){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
  {
    headers : header
  }).then((response)=>response)
  .catch((error)=>error)
}

function checkoutPayment(id,formData){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
  {
      shippingAddress:formData
  },
  {
  headers:header
  }
  ).then((response)=>response)
  .catch((error)=>error)
}




return <
  CartContext.Provider value={{addToCart, getCart,removeCartItems ,updateProductQuatity, deleteUserCart, cartNumber,setCartNumber, checkoutPayment}}>
{props.children}
</CartContext.Provider>

}