import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './../../context/CartContext';
import { Link } from 'react-router-dom';




export default function Cart() {

let {getCart,removeCartItems,updateProductQuatity,deleteUserCart}= useContext(CartContext)
const[cartDetails, setCartDetails]=useState(null)

 async function getUserCart(){
let {data} = await getCart();
setCartDetails(data);
localStorage.setItem('userID',data.data.cartOwner)
}

 async function removeItems(id){
  let {data} = await removeCartItems (id)
  setCartDetails(data);
 }

 async function updateCount(id , count){
  let {data} = await updateProductQuatity (id , count)
  setCartDetails(data);
}

 async function clearCart(){
  let {data} = await deleteUserCart()
  setCartDetails(null);
}

useEffect(()=>{
getUserCart()
})

  return (
  <>
  {cartDetails ?
    <div className='w-75 mx-auto p-3 bg-main-light my-3'>
    <h3 className='fw-bolder p-2'>Shopping Cart</h3>
    <Link to="/checkout">
    <button className="btn bg-main text-light text-end">Check out</button>
    </Link>
    <h4 className='text-main fw-bolder p-2'> Cart Items: {cartDetails.numOfCartItems}</h4>
    <h4 className=' text-main fw-bolder mb-4'> Total Cart Price: {cartDetails.data.totalCartPrice} EGP </h4>
    {cartDetails.data.products.map((product)=>
<div className="row border-bottom py-2 px-3" key={product.product.id}>
<div className="col-md-1">
  <img src={product.product.imageCover} className='w-100' alt=''/>
</div>
<div className="col-md-11">
  <div className="d-flex justify-content-between align-items-center">
<div>
<h3 className='h6'>{product.product.title.split('').slice(0,15).join('')}</h3>
<h6 className='text-main'> price: {product.price} EGp</h6>
</div>
<div>
  <button className='brd-main p-1' onClick={()=>updateCount(product.product.id, product.count+1 )}>+</button>
  <span className='mx-2'>{product.count}</span>
  <button className=' brd-main p-1' onClick={()=>updateCount(product.product.id, product.count -1 )}>-</button>
</div>

  </div>

  <button className='btn p-0' onClick={()=> removeItems(product.product.id)}> <i className=' text-danger fas fa-trash-can font-sm'></i> Remove</button>
</div>







</div>




    )}
  
  
  
  
  
  
  <button className='btn btn-outline-danger w-100 text-black fw-bold' onClick={()=>clearCart()} ><i className=' text-danger fas fa-trash-can'></i>Clear Cart</button>
  
  </div>

   :  
   <h3 className='fw-bolder text-warning vh-100 text-center d-flex align-items-center justify-content-center'>Cart is Empty</h3>

   }
  </>
  
  
  
  
  
  
  
  
  
 

   
  )
}
