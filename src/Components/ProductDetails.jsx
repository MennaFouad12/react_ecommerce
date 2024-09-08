import React, { useState } from 'react'
import { Link, useMatches, useParams } from 'react-router-dom'
import { getProductwithCategories, getSingleProduct } from '../Apis/getProducts';
import { useEffect } from 'react';
import Loading from './Loading';
import { motion } from "framer-motion";
import Item from './Item';
import { addToCartApi } from './../Apis/cartApi';
import useMutationCart from '../Hooks/useMutationCart';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {


    let {mutate:addmutate,data,status} = useMutationCart(addToCartApi)
   
    
   
    if(status==='success')
        toast.success(data?.data?.message)
    
        

    let { id ,categoryId} = useParams()
    // useParams() is a custom React hook provided by the React Router library. 
    // It allows you to access the parameters of the current route, which are typically defined in the route path using dynamic segments.
    //  This hook is particularly useful for retrieving values from URLs that contain dynamic segments,
    //  such as user IDs or product slugs.


     let [src,setSrc] = useState('')

    let [msg, setMsg] = useState('')
    let [loading, setloading] = useState(false)
    let [product, setProduct] = useState({})
    let [productCategories,setproductCategories] = useState([])
    function changeSrc(e)
    {
      setSrc( e.target.src)
    }
    async function getSingleProductApi() {
        let data = await getSingleProduct(id)
        if (data?.data) {
            setProduct(data?.data)
            setMsg('')
            setloading(false)

        }
        else {
            setMsg(data?.message)
            setloading(false)
        }
    }
    async function getProductwithCategoriesApi() {
        let data = await getProductwithCategories(categoryId)
       
        if (data?.data) {
           
            setMsg('')
            setloading(false)
            setproductCategories(data?.data)
        }
        else {
            setMsg(data?.message)
            setloading(false)
        }
    }

    if (loading)
        return <Loading></Loading>

    if (msg)
        return <h2 className='text-red-700 font-bold'>{msg}</h2>

    useEffect(() => {
       
        getProductwithCategoriesApi()
    }, [])

  
    useEffect(()=>{
        getSingleProductApi()
    },[id])

    return (
        <div className='row-tw items-center'>
                <Helmet>
        <meta charSet="utf-8" />
        <title>Details</title>
       
      </Helmet>
            <div className="md:w-1/3 p-3">
            <img src={src?src:product?.imageCover} className='w-full' alt="" />
            <ul className='flex gap-2 relative justify-center my-2'>
                {product?.images?.map(img=><li key={img}><motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}  onClick={changeSrc} className='cursor-pointer' width={70} src={img} alt="" /></li>)}
            </ul>
            </div>
           <div className="md:w-2/3 p-3">
           <p className='text-green-700 my-3'>{product?.category?.name}</p>
           <p className='line-clamp-1 my-3'>{product?.title}</p>
           <p>{product.description}</p>
           <div className='flex justify-between my-3'>
            <span>{product?.price}EGP</span>
            <span> <i className='fas fa-star text-yellow-600'></i> {product?.ratingsAverage}</span>
           </div>
           <button  onClick={()=>addmutate(product?._id)} className='btn block w-full bg-green-700 text-white my-5 p-2 rounded'>Add To cart</button>
           </div>
           {productCategories.map(prod=><Item key={prod._id} prod={prod}></Item>)}
        </div>
    )
}
