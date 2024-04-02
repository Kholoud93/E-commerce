import axios from 'axios'
import React, { useEffect } from 'react';
import { useState } from 'react';




export default function Allorders() {
  const [allOrders, setAllOrders] = useState([]);

  async function getUserOrders() {
    const userID = localStorage.getItem('userID');
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`);
        setAllOrders(response.data); // Set state with response data
    } catch (error) {
        console.error("Error fetching user orders:", error);
        // Handle error gracefully, perhaps by setting an error state
    }
}

   
 





  useEffect(()=>{
    getUserOrders()
  },[])

 

  return (
 <>
 <div className="conntainer">
  <div className="row">
    <div className="col-md-6">
    {allOrders.map((order, idx) => (
    <div key={idx} className="order w-75 mx-auto p-3 bg-main-light my-3">
        <h5 className='brd-main'>payment method: {order.paymentMethodType}</h5>
        <h5 className='brd-main'>total order price: {order.totalOrderPrice}</h5>
        {/* Check if shippingAddress exists */}
        {order.shippingAddress && (
            <p className='fw-bold'>
                Your order is delivering to {order.shippingAddress.details || "Unknown"}, 
                {order.shippingAddress.city || "Unknown"}, 
                {order.shippingAddress.phone || "Unknown"}
            </p>
        )}
    </div>
))}

    </div>
  </div>
 </div>
 </>
  )
}

