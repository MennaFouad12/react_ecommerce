
import React from 'react'
import useQueryWishlist from '../Hooks/useQueryWishlist';
import useMutationWishlist from '../Hooks/useMutationWishlist';
import { deletelistApi, getlistApi } from "../Apis/wishlistApi";
import Loading from './Loading';
import { addToCartApi } from '../Apis/cartApi';
import useMutationCart from '../Hooks/useMutationCart';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

function Wishlist () {
    let { data, isLoading, isError, error } = useQueryWishlist('wishlist',getlistApi )
    let { mutate: addmutate, data:cartdata, status } = useMutationCart(addToCartApi);
  let { mutate: delmutate,isPending:delpending } = useMutationWishlist(deletelistApi)
  if (isLoading||delpending){
    return <Loading></Loading>
  }
  if (status === 'success') toast.success(cartdata?.data?.message);

    return ( <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
       
      </Helmet>
<div  className='bg-gray-100 p-5 lg:m-25 md:m-15 m-5'>
  <h3 className='font-bold text-2xl mb-5'>My wish list</h3>
      {data?.data?.map((ele) => (
        <div key={ele?._id} className='flex md:flex-row flex-col justify-between items-center border-b-2'>
          <div className='flex md:flex-row flex-col items-center'>
            <img className='h-96 w-full object-cover cursor-pointer p-5' src={ele?.imageCover} alt={ele?.title} />
            <div className='p-5'>
              <h5 className='my-2 font-bold'>{ele?.title}</h5>
              <h6 className='my-2 font-medium' >{ele?.price} EGP</h6>
              <p onClick={() => { delmutate(ele?._id); }}className='cursor-pointer text-red-700' ><i className="fa-solid fa-trash text-red-700 my-2  "></i> Remove</p>
            </div>
          </div>
          <div>
            <button onClick={() => { addmutate(ele?._id); }} className='btn bg-green-700 text-white my-2 p-2 rounded'>
              Add To cart
            </button>
          </div>
        </div>
      ))}
    </div>

    
{/* <div>
{
    data?.data?.map((ele)=>{
        <div className='flex md:flex-row flex-col justify-between  border-b-2'>
            <div className='flex md:flex-row flex-col '>
      <img className='h-96 w-full object-fit cursor-pointer' src={ele?.imageCover}  />
      <div>
      <h5>{ele?.title}</h5>
      <h6> {ele?.price}</h6>
      <p onClick={() => { delmutate(ele?._id); }}><i  className="fa-solid fa-trash text-red-700"></i> Remove</p>
      </div>
      </div>
      <div>
      <button onClick={() => { addmutate(ele?._id); }} className='btn bg-green-700 text-white p-2 rounded'>Add To cart</button>
      </div>
    </div>
    })
}
</div> */}
    </> );
}

export default Wishlist ;