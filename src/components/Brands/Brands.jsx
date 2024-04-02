import axios from 'axios'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'


export default function Brands() {

async  function getBrands(){
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  
 let{data, isLoading , isFetching , isError}= useQuery('brands', getBrands)

  return (
    <div className='row'>
     
    { !isLoading ?
    <>
   
    {
     data?.data.data.map((brand)=>{
      return <div className="col-md-3" key={brand._id}>
             <img className='w-100' src={brand.image} alt={brand.name}/>
             <p>{brand.name}</p>
      </div>
      })
    }  
    </>
    :
    <div className='vh-100 d-flex justify-content-center align-items-center'>
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
