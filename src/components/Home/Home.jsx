import React from 'react'
import Products from './../Products/Products';
import Category from '../Category/Category';
import HomeSlider from '../HomeSlider/HomeSlider';
import {Helmet} from "react-helmet";

export default function Home() {
  return (
    <div>
              <Helmet>
             
                <title>Fresh Cart Home</title>
               
            </Helmet>
      <HomeSlider/>
    <h2>Categories</h2>
    <Category/>
        <h2>Products</h2>
        <Products/>
    </div>
  )
}
