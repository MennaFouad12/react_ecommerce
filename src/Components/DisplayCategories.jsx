import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { getCategories } from '../Apis/getCategories';

export default function DisplayCategories() {


    let [msg, setMsg] = useState('')
    let [loading, setloading] = useState(false)
    let [categories, setcategories] = useState([])

    async function geCategoriesApi() {
        setloading(true)
        let data = await getCategories()


        if (data?.data) {
            setcategories(data?.data)
            setMsg('')
            setloading(false)
        }

        else {
            setMsg(data?.message)
            setloading(false)
        }
    }

    useEffect(() => {
        geCategoriesApi()
    }, [])




    



    return (
        <>
 
<div className='row-tw mt-10 flex justify-center flex-wrap gap-10 '>
  {categories.map(ele => (
    <div className='lg:w-1/6 md:w-1/4 w-1/2  border-2 hover:border-green-500 shadow-lg' key={ele._id}>
      <img className='h-96 w-full object-fit cursor-pointer' src={ele?.image} alt={ele?.name} />
      <p className='text-center p-5 text-green-700 font-bold'>{ele?.name}</p>
    </div>
  ))}
</div>

         {/* {categories.map(ele=><p  key={ele._id} >{ele?.name}</p>)} */}
        </>
    )
}
