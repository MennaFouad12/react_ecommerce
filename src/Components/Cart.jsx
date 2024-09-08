import React from 'react'
import useQueryCart from '../Hooks/useQueryCart'
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../Apis/cartApi'
import Loading from './Loading'
import useMutationCart from '../Hooks/useMutationCart'
import empcart from '../assets/finalProject assets/images/group_852_2x.png'
import { Button } from 'flowbite-react'
import BasicModal from './BasicModal'
import { Helmet } from 'react-helmet'

export default function Cart() {


  let { data, isLoading, isError, error } = useQueryCart('cart', getCartApi)

  let { mutate: delmutate, isPending: delpending } = useMutationCart(deleteCartApi)
  let { mutate: updatemutate, isPending: uppending } = useMutationCart(updateCartApi)
  let { mutate: clearmutate, isPending: clrpending } = useMutationCart(clearCartApi)


  // if (isError || !data?.data?.totalCartPrice)
  //   return <h2>cart is empty</h2>
  console.log(data?.data?.products);
  if (isLoading || delpending || uppending || clrpending)
    return <Loading></Loading>

  if (!data?.numOfCartItems) {
    return (<>
      <img src={empcart} className='mx-auto md:w-50 w-96' alt="" />
    </>)
  }
  if (data?.data?.totalCartPrice)
    return (
      <div>
         <Helmet>
        <meta charSet="utf-8" />
        <title>cart</title>
       
      </Helmet>
     
        <div className='bg-gray-100 p-5 lg:m-25 md:m-15 m-5'>

          <h1 className='font-bold text-2xl mb-5'>My Cart</h1>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='my-2 text-2xl'>Total Price <span className='text-green-700 font-bold'>{data?.data?.totalCartPrice} EGP</span></h2>

              <h2 className='my-2 text-2xl'>Total items <span className='text-green-700 font-bold'>{data?.numOfCartItems} </span></h2>
            </div>
            <button className='px-8 py-2 my-4  rounded-md border-2 border-green-500 text-center block ' onClick={clearmutate}>clear</button>
          </div>

          {
          data?.data?.products.map((ele) => (
            <div key={ele?._id} className='flex md:flex-row flex-col justify-between items-center border-b-2'>
              <div className='flex md:flex-row flex-col items-center'>
                <img className='h-96 w-full object-cover cursor-pointer p-5' src={ele?.product?.imageCover} alt={ele?.title} />
                <div className='p-5'>
                  <h5 className='my-2 font-bold'>  {ele?.product?.title}</h5>
                  <h6 className='my-2 font-medium' >{ele?.price} EGP</h6>
                  <p onClick={() => delmutate(ele?.product?._id)} className='cursor-pointer text-red-700' ><i className="fa-solid fa-trash text-red-700 my-2  "></i> Remove</p>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <button
                    onClick={() => ele?.count == 1 ? delmutate(ele?.product?._id) : updatemutate({ id: ele?.product?._id, count: ele?.count ? ele?.count - 1 : ele?.count })} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:bg-gray-700 light:hover:border-gray-600 light:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span>{ele?.count}</span>
                  </div>
                  <button
                    //لما بستخدم ال mutate وابعتلها اكتر من حاجه لازم احطهم جوا اوبجكت
                    onClick={() => updatemutate({ id: ele?.product?._id, count: ele?.count + 1 })} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-green-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:bg-gray-700 light:hover:border-gray-600 light:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <BasicModal cartid={data?.data?._id}></BasicModal>
         
        </div>


      </div>
    )

}
