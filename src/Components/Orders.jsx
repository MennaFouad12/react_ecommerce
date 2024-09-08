
import { jwtDecode } from 'jwt-decode';
import Loading from './Loading';
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userid, setUserid] = useState('');

  // Fetch orders function
  const fetchOrders = useCallback(async (userid) => {
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`);
      setOrders(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log (data)
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const decoded = jwtDecode(userToken);
      setUserid(decoded.id); // Assuming the decoded token has an `id` field
    }
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    if (userid) {
      fetchOrders(userid); // Fetch orders when userid is set
    }
  }, [userid, fetchOrders]); // Dependency array to include `userid` and `fetchOrders`

  if (loading) return <Loading></Loading> ;

  return (
    <div  className='bg-gray-100 p-5 lg:m-25 md:m-15 m-5'>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
       
      </Helmet>
  <h3 className='font-bold text-2xl mb-5'>My Orders</h3>
      <ul>
        {
        
        orders.map((order) => (
          order.cartItems.map((product)=>(

    
    <div  key={product?._id} className='flex md:flex-row flex-col items-center border-b-2'>
      <img className='h-96 object-cover cursor-pointer p-5' src={product?.product?.imageCover} alt={product?.product?.title} />
      <div className='p-5'>
        <h5 className='my-2 font-bold'>{product?.product?.title}</h5>
        <h6 className='my-2 font-medium' > Price :{product?.price}</h6>
        <h6 className='my-2 font-medium' >amount :{product?.count}</h6>
       
      </div>
    
    
  </div>

          ))
         
        ))
      
      }
      </ul>
    </div>
  );
};

export default OrderList;
