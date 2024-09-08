import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import useQueryCart from '../Hooks/useQueryCart';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
export default function Login() {
  //npm i formik
  //handle change
  //handle submit
  //handle reset
  //values
  ////////home
  /////localstorage

  let {setLogin} = useContext(auth)
  let navigate = useNavigate()




  let [msg, setMsg] = useState('')
  let [loading, setLoading] = useState(false)
  const queryclient = useQueryClient()
  async function handleLogin(values) {
    try {
      setLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      if (data.message === 'success') {
        setLoading(false)
        setMsg('')
        localStorage.setItem('userToken', data.token)
        console.log(localStorage.getItem('userToken'));
        navigate('/')
        queryclient.invalidateQueries({queryKey:["cart"]})
        setLogin(jwtDecode(data.token))
        ////
      }
    } catch (err) {
      setLoading(false)
      setMsg(err?.response?.data?.message)
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email().required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-zA-Z0-9]{5,10}$/).required('password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  })

  //id == > e.target

  return (
    <div >
          <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
       
      </Helmet>
      <h2 className='text-2xl my-3  text-center'>Login Now:</h2>
      {msg ? <div className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{msg}</span>
      </div> : ''}
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


        <div className="relative z-0 w-full mb-5 group">
          <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>

        {/* alert */}

        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : ''}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} type="password" value={formik.values.password} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>


        {/* alert */}

        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.password}</span>
        </div> : ''}

<div className='text-center mb-2'>
        <button type="submit" className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {loading ? <i className='fas fa-spin fa-spinner text-white'></i> : 'Login'}
        </button>
        </div>
      </form>

      <p className='text-center'>dont have account ? <Link className='text-underline text-green-700 font-medium' to={'/register'}>Register</Link></p>
       <p className='text-center '> <Link className=' my-3 text-green-700 font-medium' to='/forget'> forget password </Link></p>
    </div>
  )
}


//state managent 
//context api
//redux toolkit
//react query