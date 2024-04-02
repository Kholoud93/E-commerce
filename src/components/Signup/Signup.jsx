import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react' ;
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';




export default function Signup() {
  let navigate = useNavigate()
  const[isLoading , setLoading]= useState(false)
  const[errMsg , setErr] = useState(null)

let validationSchema = Yup.object ({
  name: Yup.string().required('name is required').min(3 , 'min char is 3').max(10 , 'max char is 10'),
  email: Yup.string().email('Invalid email').required('email is required'),
  phone: Yup.string().required('phone number is required').matches(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
  password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'password must begin with capital letter'),
  rePassword: Yup.string().oneOf([Yup.ref('password')], 'Not matched')
})

  // function validate(values){
  //   let errors ={};
  //   if(!values.name){
  //     errors.name = 'name is required'
  //   }else if(values.name.length < 3){
  //     errors.name = 'min length is 3 char'
  //   }else if(values.name.length > 10){
  //     errors.name = 'max length is 10 char'
  //   }

  //   if(!values.email){
  //     errors.email = 'email is required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if(!values.phone){
  //     errors.phone = 'phone is required'
  //   }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
  //     errors.phone = 'Invalid phone number'
     
  //   }

  //   if(!values.password){
  //     errors.password = 'password is required'
  //   }else if(!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
  //     errors.password = 'Invalid password'
  //   }

  //   if(!values.rePassword){
  //     errors.rePassword = 'confirm is required'
  //   }else if(values.password !== values.rePassword){
  //     errors.rePassword = 'Not matched'
  //   }


  //   return errors
  // }


 async function signUP(val){
  setLoading(true)
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
setErr(err.response.data.message)
setLoading(false)
  })

 
if(data.message === 'success'){
  setLoading(false)
  navigate('/signin')
}


}

 let formik = useFormik({
  initialValues : {
    name: '',
    email :'',
    phone: '',
    password: '',
    rePassword : ''
    },
    validationSchema: validationSchema ,
onSubmit: signUP
  })
  return (
    <div className='my-5'>
      <h1 className='text-main text-center'>Register Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
        <div className="col-md-8 m-auto p-4 w-50 bg-light shadow">
      <div className="row gy-4">
        <div className="col-md-12">
          <label htmlFor="userName">Name</label>
         <input type="text" className='form-control' id='userName' name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
         {formik.errors.name && formik.touched.name ? <p className='text-danger'>{formik.errors.name}</p> : ''}
        </div>
        <div className="col-md-12">
          <label htmlFor="userEmail">Email</label>
          <input type="email" className='form-control' id='userEmail' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <p className='text-danger'>{formik.errors.email}</p> : ''}
        </div>
        <div className="col-md-12">
          <label htmlFor="userPhone">Phone</label>
          <input type="tel" className='form-control' id='userPhone' name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}/>
          {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ''}
        </div>
        <div className="col-md-12">
          <label htmlFor="userPassword">Password</label>
          <input type="password" className='form-control' id='userPassword' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : ''}
        </div>
        <div className="col-md-12">
          <label htmlFor="userConfirm">rePassword</label>
          <input type="password" className='form-control' id='userConfirm' name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} />
          {formik.errors.rePassword && formik.touched.rePassword ? <p className='text-danger'>{formik.errors.rePassword}</p> : ''}
        </div>
        {errMsg !== null ? <p className='text-danger'>{errMsg}</p> : ''}
<div className="col-md-12 text-end">
  <button className='btn bg-main text-light my-2 ' type='submit' disabled ={!(formik.isValid && formik.dirty)}>Register
  {isLoading ? <span><i className='fa-solid fa-spinner fa-spin text-light mx-2'></i></span> : ''
}

  </button>
</div>

<p className='text-muted'>Have an account ?<Link to= '/signin' className='text-main fw-bold'>Login</Link></p>
      </div>
      
     </div>
        </div>
     
      </form>
    </div>
  )
}
