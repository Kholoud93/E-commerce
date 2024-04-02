import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useContext, useState } from 'react' ;
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from './../../context/UserContext';

export default function Signin() {

  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  const[isLoading , setLoading]= useState(false)
  const[errMsg , setErr] = useState(null)

let validationSchema = Yup.object ({
 
  email: Yup.string().email('Invalid email').required('email is required'),
 
  password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Invalid password'),

})

  // function validate(values){
  //   let errors ={};
    

  //   if(!values.email){
  //     errors.email = 'email is required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }


     
  //   }

  //   if(!values.password){
  //     errors.password = 'password is required'
  //   }else if(!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
  //     errors.password = 'Invalid password'
  //   }




  //   return errors
  // }


 async function signIn(val){
  setLoading(true)
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
setErr(err.response.data.message)
setLoading(false)
  })

 
if(data.message === 'success'){
  localStorage.setItem('userToken', data.token)
  setUserToken(data.token)
  setLoading(false)
  navigate('/')
}


}

 let formik = useFormik({
  initialValues : {
    email :'',
    password: '',
    },
    validationSchema: validationSchema ,
onSubmit: signIn
  })
  return (
    <div>
 <div className='my-5'>
      <h1 className='text-main text-center'>Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
        <div className="col-md-8 m-auto p-4 w-50 bg-light shadow">
      <div className="row gy-4">
        <div className="col-md-12">
          <label htmlFor="userEmail">Email</label>
          <input type="email" className='form-control' id='userEmail' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
        </div>
        <div className="col-md-12">
          <label htmlFor="userPassword">Password</label>
          <input type="password" className='form-control' id='userPassword' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}
        </div>
        {errMsg !== null ? <p className='text-danger'>{errMsg}</p> : ''}
<div className="col-md-12 text-end">
  <button className='btn bg-main text-light my-2 ' type='submit' disabled ={!(formik.isValid && formik.dirty)}>Login
  {isLoading ? <span><i className='fa-solid fa-spinner fa-spin text-light mx-2'></i></span> : ''
}

  </button>
</div>

<p className='text-muted'>don't  have an account ?<Link to= '/signup' className='text-main fw-bold'> Register</Link></p>
<p className='text-muted'>Forget Password?<Link to= '/forgetPass' className='text-main fw-bold'> Forget Password</Link></p>
      </div>
      
     </div>
        </div>
     
      </form>
    </div>
    </div>
  )
}
