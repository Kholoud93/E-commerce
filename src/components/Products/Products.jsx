import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import {Helmet} from "react-helmet";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';




export default function Products() {
  const [productList , setProduct] =useState([])
 let{addToCart, setCartNumber}= useContext(CartContext);



 



  async function addProductToCart(id){
    let {data} = await addToCart(id)
 
    if(data.status === 'success'){
       toast.success('Product added succefully')
    }else {
       toast.error('Err adding product')
    }
    setCartNumber(data.numOfCartItems)
 }

 async function getProducts(){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  setProduct(data.data)
}





  
  


useEffect(()=>{
  getProducts()
},[])

  return (

<div className="row">

  {productList.length > 0 ?
  <>
{productList.map((product)=>{
       return   <div className="col-md-3" key={product._id}>
  
          <div className="product p-5">
          <Link to={`/details/${product._id}`}>
          <img src={product.imageCover} className='w-100' alt={product.title}/>
           <p className='text-main'>{product.category.name}</p>
           <h6>{product.title}</h6>
           <div className='d-flex justify-content-between'>
            <p>{product.price} EGp</p>
            <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></p>
           </div>
           
       </Link>
           <button  className='btn bg-main text-light w-100' onClick={()=> addProductToCart(product._id)}>Add to cart</button>
          </div>
       </div>
      })
    } 
  </>
  :
  <div className='d-flex justify-content-center align-items-center vh-100'>
   <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div>
  }

</div>
  )
}
