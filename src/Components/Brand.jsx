import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from './Loading'


export default function Brand() {

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['brands'], queryFn: getBrands,
    // refetchOnWindowFocus : لو عملت focus ميعملش ريفيتش
   // gcTime:5000 لو خرجت برا الكومبوننت وقعدت اكتر من 5 ثواني هرجع الاقيه بيعمل لودينج عشان وقت الكاش خلص
    // staleTime:3000 الوقت اللي الداتا فيه بتفضل فريش
    // refetchInterval:4000  هعمل ريفيتش كل ثانيه عشان في 3 ثواني الداتا هتبقا فريش وطول ما هيا فريش مش بنعمل ريفيتش
   select:(data)=>data?.data?.data
  })
// In React Query, your data can be fresh or stale. If it's fresh, the saved (cached) data will be used repeatedly, without more API calls to the server. 
// If data is stale, then fresh data gets fetched anytime the window refocuses, the component re-mounts or the network reconnects.


//  refetch :1-لو النتورك فصتلت
//  2-لما بتنقل من كومبوننت للتاني
//  3-focu on window دا لما اتنقل من تابه لتابه تانيه 
console.log(data);
  if (isLoading)
    return <Loading></Loading>

if(isError)
  return <h2>{error.message}</h2>

  return (
    <div className='row-tw gap-3 justify-center'>
      {data?.map(ele=><div className='w-2/4 md:w-1/4 lg:w-1/6 shadow-md ' key={ele?._id}>
      <img src={ele?.image} alt="" />
      
      </div>)}
    </div>
  )
}
