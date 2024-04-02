import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function Details() {
 let params =useParams()
 let{addToCart, setCartNumber}= useContext(CartContext);
 function getDetails(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 }
 let {data} =useQuery('productDetails', ()=>getDetails(params.id));

 async function addProductToCart(id){
  let {data} = await addToCart(id)

  if(data.status === 'success'){
     toast.success('Product added succefully')
  }else {
     toast.error('Err adding product')
  }
  setCartNumber(data.numOfCartItems)
}

  return (
<>
<div className="container my-5">
{data?.data.data? <div className='row py-5 align-items-center' >
  <div className="col-md-4">
  <img src={data?.data.data.imageCover} alt={data?.data.data.title} className='w-100'/>
  </div>
 
  <div className="col-md-8 d-flex flex-column justify-content-around">
    <h2 className='h5'>{data?.data.data.title}</h2>
    <p>{data?.data.data.description}</p>
    <h6 className='text-main'>{data?.data.data.category?.name}</h6>
    <h6 className='text-main'>price: {data?.data.data.price} Egp</h6>

    <div className="d-flex justify-content-between">
      <span>ratingsQuantity: {data?.data.data.ratingsQuantity}</span>
      <span><i className='fa-solid fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
    </div>
    <button className='btn bg-main w-100 text-white mt-2'  onClick={()=> addProductToCart(params.id)}>Add To Cart</button>
  </div>
</div>
:''}
</div>
</>
  )
}
