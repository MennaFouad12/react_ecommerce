import React, { useEffect, useState } from 'react'
import { getProducts } from '../Apis/getProducts'
import Loading from './Loading';
import Item from './Item';

// FeaturedProducts =>Home,products
export default function FeaturedProducts({ arr }) {



  

  let [msg, setMsg] = useState('')
  let [loading, setloading] = useState(false)
  let [products, setProducts] = useState([])

  async function getProductApi() {
    setloading(true)
    let data = await getProducts()
    console.log(data);

    if (data?.data) {
      setProducts(data?.data)
      setMsg('')
      setloading(false)
      console.log('test');

    }


    else {
      setMsg(data?.message)
      setloading(false)
    }
  }


  useEffect(() => {
    getProductApi()
  }, [])

  if (loading)
    return <Loading></Loading>

  if (msg)
    return <h2 className='text-red-700 font-bold'>{msg}</h2>

console.log(arr);
if(arr?.length)
  return (
    <div className='row-tw '>
      { arr.map(prod => <Item prod={prod} key={prod._id}></Item>)}
      

    </div>
  )


if(products.length)
  return (
    <div className='row-tw'>
      {}
      { products.map(prod => <Item prod={prod} key={prod._id}></Item>)}
      
    </div>
  )
}
