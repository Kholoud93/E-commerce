import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  let navigate = useNavigate()

  let schema = Yup.object ({
 
    email: Yup.string().email('Invalid email').required('email is required'),
    newPassword: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Invalid password'),

  })

  let formik = useFormik({
    initialValues : {
      email:'',
      newPassword: ''
    
      },
      validationSchema: schema  ,
  onSubmit: resetPassword
    })




  
  async function resetPassword(values){
  let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
  if(data.token){
   
    navigate('/signin')
    
  } 

  }
  return (
   <>
        <div className='my-5 resetPassword'>
    <h1 className='text-main text-center'>Reset Password</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
      <div className="col-md-8 m-auto p-4 w-50 bg-light shadow">
    <div className="row gy-4">
      <div className="col-md-12">
        <label htmlFor="userEmail"> Email: </label>
        <input type="email" className='form-control' id='userEmail' name='email' onBlur={formik.handleBlur} 
        onChange={formik.handleChange} value={formik.values.email} />
        {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
      </div>
      <div className="col-md-12">
        <label htmlFor="userPass"> newPassword: </label>
        <input type="password" className='form-control' id='userPass' name='newPassword' onBlur={formik.handleBlur} 
        onChange={formik.handleChange} value={formik.values.newPassword} />
        {formik.errors.newPassword && formik.touched.newPassword ? <p className='text-danger'>{formik.errors.newPassword}</p> : ''}
      </div>
    
<div className="col-md-12 text-end">
<button className='btn bg-main text-light my-2 ' type='submit' disabled ={!(formik.isValid && formik.dirty)}> Reset Password


</button>
</div>
    </div> 
   </div>
      </div>
    </form>
  </div>
   </>
  )
}
