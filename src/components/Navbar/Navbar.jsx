import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'




export default function Navbar() {
let {userToken , setUserToken}= useContext(UserContext)
let {cartNumber,getCart,setCartNumber}=useContext(CartContext)
let navigate = useNavigate();

function logOut(){
  localStorage.removeItem('userToken')
 setUserToken(null)
 navigate('./signin')
}

useEffect(()=>{
  (async ()=>{
   let data = await getCart();
 
  setCartNumber(data.numOfCartItems)
  
  })()
  },[])

  return (
   <>
 <div className="container-fluid">
 <nav
className="navbar navbar-expand-sm navbar-light bg-light "
>
  <Link className="navbar-brand" to="#"><i className='fa-solid fa-cart-shopping text-main mx-3'></i><span className='fw-bold'>FreshCart</span></Link>
  <button
    className="navbar-toggler d-lg-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#collapsibleNavId"
    aria-controls="collapsibleNavId"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavId">
    <ul className="navbar-nav me-auto mt-2 mt-lg-0 ">
     {userToken !== null ?
     <> 
         <li className="nav-item">
        <Link className="nav-link" to="home">Home</Link>
      </li>
         <li className="nav-item">
        <Link className="nav-link" to="cart">Cart</Link>
      </li>
     
      <li className="nav-item">
        <Link className="nav-link" to="products">Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="category">Categories</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="brands">Brands</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="allorders">Allorders</Link>
      </li>
      </> : ''
    }
   
     
    </ul>
    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      <div className='d-flex align-items-center'>
      <i className='fa-brands fa-facebook mx-3'></i>
      <i className='fa-brands fa-twitter mx-3'></i>
      <i className='fa-brands fa-instagram mx-3'></i>
      <i className='fa-brands fa-linkedin mx-3'></i>
     </div>
   {userToken !== null ?   
      <> 
        <li className="nav-item">
            <Link className="nav-link" to="cart">
            <i className='fa-solid fa-shopping-cart text-main'></i>
            <span className='badge bg-main text-light'>{cartNumber}</span>
            </Link>
            </li>
      <li className="nav-item">
        <span className="nav-link cursor-pointer"  onClick={()=> logOut()}>Logout</span>
      </li>
    </> 
      
      : <> 
     <li className="nav-item">
        <Link className="nav-link" to="signup">Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="signin">Login</Link>
        </li>
      </>
      }
        </ul>
       
       
      </div>
    </nav>
 </div>
    </>
   
   

  
  )
}



