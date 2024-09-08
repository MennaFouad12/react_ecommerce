import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMutationCart from '../Hooks/useMutationCart';
import useMutationWishlist from '../Hooks/useMutationWishlist';
import { addToCartApi } from '../Apis/cartApi';
import { toast } from 'react-toastify';
import { addTolistapi, deletelistApi } from '../Apis/wishlistApi';

export default function Item({ prod }) {
  // Define a unique key for local storage based on product ID
  const localStorageKey = `heartFlag_${prod?._id}`;
  
  // Initialize state based on local storage value
  const [flag, setFlag] = useState(() => {
    const savedFlag = localStorage.getItem(localStorageKey);
    return savedFlag === 'true'; // localStorage stores values as strings
  });

  // Update local storage whenever the flag changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, flag);
  }, [flag, localStorageKey]);

  let { mutate: addmutate, data, status } = useMutationCart(addToCartApi);
  let { mutate: addlistmutate, data:listdata, status :liststatus} = useMutationWishlist(addTolistapi);
  let { mutate: dellistmutate, data:listdata2, status :liststatus2} = useMutationWishlist(deletelistApi);

  if (status === 'success') toast.success(data?.data?.message);
 

  return (
    <div className='w-2/4 md:w-1/4 lg:w-1/6 shadow-md'>
      <div className="product p-2 cursor-pointer">
        <Link to={`/productdetails/${prod?._id}/${prod?.category?._id}`}>
          <img src={prod?.imageCover} className='w-full' alt="" />
          <p className='text-green-700'>{prod?.category?.name}</p>
          <p className='line-clamp-1'>{prod?.title}</p>
          <div className='flex justify-between my-3'>
            <span>{prod?.price}EGP</span>
            <span><i className='fas fa-star text-yellow-600'></i> {prod?.ratingsAverage}</span>
          </div>
        </Link>
        <div className='flex justify-between items-center my-3'>
          <button onClick={() => { addmutate(prod?._id); }} className='btn bg-green-700 text-white p-2 rounded'>Add To cart</button>
          <i
  onClick={() => {
    setFlag(prevFlag => {
      const newFlag = !prevFlag;
      if (newFlag) {
        addlistmutate(prod?._id);
      } else {
        dellistmutate(prod?._id);
      }
      return newFlag;
    });
  }}
  className={`fas fa-heart cursor-pointer ${flag ? 'text-red-700' : 'text-gray-300'}`}
/>

        </div>
      </div>
    </div>
  );
}

