import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function ForgetPassword() {
  let navigate = useNavigate()
 

  let validationSchema = Yup.object ({
 
    email: Yup.string().email('Invalid email').required('email is required'),
  })

  let formik = useFormik({
    initialValues : {
      email :'',
    
      },
      validationSchema: validationSchema ,
  onSubmit: SendCode
    })

    async function SendCode(values){
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      // console.log(data);
      if(data.statusMsg === 'success'){
        toast.success(data.message)
        document.querySelector('.forgetPass').classList.add('d-none')
        document.querySelector('.verifyCode').classList.remove('d-none')
      
      }
    }

 

  let schema = Yup.object ({
 
    resetCode: Yup.string().required('enter reset code'),
  })

  let verifyformik = useFormik({
    initialValues : {
     resetCode : '',
    
      },
      validationSchema: schema  ,
  onSubmit: GetCode
    })




  
  async function GetCode(values){
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
  if(data.status === 'Success'){
    toast.success(data.status)
    navigate('/resetPass')
    
  } 

  }


  










  return (
    <>
        <div className='my-5 forgetPass'>
    <h1 className='text-main text-center'>Forget Password</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
      <div className="col-md-8 m-auto p-4 w-50 bg-light shadow">
    <div className="row gy-4">
      <div className="col-md-12">
        <label htmlFor="userEmail"> Enter your Email</label>
        <input type="email" className='form-control' id='userEmail' name='email' onBlur={formik.handleBlur} 
        onChange={formik.handleChange} value={formik.values.email} />
        {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
      </div>
    
<div className="col-md-12 text-end">
<button className='btn bg-main text-light my-2 ' type='submit' disabled ={!(formik.isValid && formik.dirty)}> Send Code


</button>
</div>
    </div> 
   </div>
      </div>
    </form>
  </div>

  <div className='my-5 verifyCode d-none'>
    <h1 className='text-main text-center'>Reset Code</h1>
    <form onSubmit={verifyformik.handleSubmit}>
      <div className="row">
      <div className="col-md-8 m-auto p-4 w-50 bg-light shadow">
    <div className="row gy-4">
      <div className="col-md-12">
        <label htmlFor="userCode"> Enter your Code</label>
        <input type="text" className='form-control' id='userCode' name='resetCode' onBlur={verifyformik.handleBlur} 
        onChange={verifyformik.handleChange}  value={verifyformik.values.resetCode}  />
        {verifyformik.errors.resetCode && verifyformik.touched.resetCode ? <p className='text-danger'>{verifyformik.errors.resetCode}</p> : ''}
      </div>
    
<div className="col-md-12 text-end">
<button className='btn bg-main text-light my-2 ' type='submit' disabled ={!(verifyformik.isValid && verifyformik.dirty)} > verify Code


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

