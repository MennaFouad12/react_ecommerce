// import React, { useEffect, useState } from 'react'
// import FeaturedProducts from './FeaturedProducts'
// import { getCategories } from '../Apis/getCategories'
// import { getProductwithCategories } from '../Apis/getProducts'
// import { Helmet } from 'react-helmet';
// import { Button } from '@mui/material';


// export default function Products() {
//   const [isClicked, setIsClicked] = useState(null);

//   const handleClick = (index) => {
//     setIsClicked(index);
//   };

//   let [categories, setcategories] = useState([])
  
//   let [msg, setMsg] = useState('')
//   let [loading, setloading] = useState(false)

//   let [specificArr,setSpecificArr] = useState([])
// //هنا بجيب كل ال categories اللي عندي 
//   async function geCategoriesApi() {
//       setloading(true)
//       let data = await getCategories()
      
//       if (data?.data) {
//           setcategories(data?.data)
//           setMsg('')
//           setloading(false)
//       }

//       else {
//           setMsg(data?.message)
//           setloading(false)
//       }
//   }

// //هنا بجيب المنتجات علي حسب ال idبتاع الكاتيجوري اللي انا دست عليها
//   async function getProductwithCategoriesApi(id)
//   {
//     setloading(true)
//     let data = await  getProductwithCategories(id)
    
//     if (data?.data) {
//       setSpecificArr(data?.data)
//         setMsg('')
//         setloading(false)
//     }

//     else {
//         setMsg(data?.message)
//         setloading(false)
//     }
     
//   }



//   useEffect(() => {
//     geCategoriesApi()
//   }, [])



//   return (
//     <div>
//       <form className="max-w-lg mx-auto">
//   <div className="flex">
//     <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
//     <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
//       </svg></button>
//     <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//       <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
//         <li>
//           <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
//         </li>
//         <li>
//           <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
//         </li>
//         <li>
//           <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
//         </li>
//         <li>
//           <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
//         </li>
//       </ul>
//     </div>
//     <div className="relative w-full">
//       <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500" placeholder="Search Mockups, Logos, Design Templates..." required />
//       <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-700 rounded-e-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
//         <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//         </svg>
//         <span className="sr-only">Search</span>
//       </button>
//     </div>
//   </div>
// </form>

//     <div className='flex justify-between md:gap-10'>
//           <Helmet>
//         <meta charSet="utf-8" />
//         <title>products</title>
       
//       </Helmet>
      


//       <ul className='p-2 my-4'>
//         {categories?.map((ele,i)=><li onClick={()=>{getProductwithCategoriesApi(ele?._id),handleClick(i)}} className={`hover:bg-green-300 ${isClicked===i?'gcolor':''} cursor-pointer my-2 p-2`} key={ele._id}>{ele.name}</li>)}
//       </ul>
     
//       <FeaturedProducts arr={specificArr}></FeaturedProducts>
//     </div>
//     </div>
//   )
// }


// import React, { useEffect, useState } from 'react';
// import FeaturedProducts from './FeaturedProducts';
// import { getCategories } from '../Apis/getCategories';
// import { getProducts, getProductwithCategories } from '../Apis/getProducts';
// import { Helmet } from 'react-helmet';
// import AnchorTemporaryDrawer from './Sidebar';
// import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
// export default function Products() {
//   const [isClicked, setIsClicked] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [specificArr, setSpecificArr] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   let [msg2, setMsg2] = useState('')
//   let [loading2, setloading2] = useState(false)
//   let [products, setProducts] = useState([])

//   async function getProductApi() {
//     setloading2(true)
//     let data = await getProducts()
//     console.log(data);

//     if (data?.data) {
//       setProducts(data?.data)
//       setMsg2('')
//       setloading2(false)
//       console.log('test');

//     }


//     else {
//       setMsg2(data?.message)
//       setloading2(false)
//     }
//   }

//   const handleClick = (index) => {
//     setIsClicked(index);
//   };

//   // Fetch categories
//   async function geCategoriesApi() {
//     setLoading(true);
//     let data = await getCategories();
//     if (data?.data) {
//       setCategories(data?.data);
//       setMsg('');
//     } else {
//       setMsg(data?.message);
//     }
//     setLoading(false);
//   }

//   // Fetch products by category
//   async function getProductwithCategoriesApi(id) {
//     setLoading(true);
//     let data = await getProductwithCategories(id);
//     if (data?.data) {
//       setSpecificArr(data?.data);
//       setFilteredProducts(data?.data); // Initialize filtered products
//       setMsg('');
//     } else {
//       setMsg(data?.message);
//     }
//     setLoading(false);
//   }

//   // Handle search input change
  // const handleSearchChange = (event) => {
 
  //   const query = event.target.value;
  //   console.log(query)
  //   setSearchQuery(query);
  //   console.log(searchQuery);
  //   // Filter products based on search query
  //   if (query) {
  //     const filtered = products.filter((product) =>
  //       product.title.toLowerCase().includes(query.toLowerCase())
  //     );

  //     setFilteredProducts(filtered);
  //   } else {
  //     setFilteredProducts(products); // Reset to original products if query is empty
  //   }
  // };

//   useEffect(() => {
//     geCategoriesApi();
//     getProductApi()
//   }, []);

//   return (
//     <div>
//       <form className="max-w-lg mx-auto my-7">
//         <div className="flex ">
//           <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//           <div className="relative w-full">
//             <input
//               type="search"
//               id="search-dropdown"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
//               placeholder="Search "
//               required
//             />
//             <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-700 rounded-e-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
//               <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//               </svg>
//               <span className="sr-only">Search</span>
//             </button>
//           </div>
//         </div>
//       </form>

//       <div className='flex justify-between md:gap-10'>
//         <Helmet>
//           <meta charSet="utf-8" />
//           <title>Products</title>
//         </Helmet>

//         {/* <ul className='p-2 my-4'>
//           {categories?.map((ele, i) => (
//             <li
//               onClick={() => {
//                 getProductwithCategoriesApi(ele?._id);
//                 handleClick(i);
//               }}
//               className={`hover:bg-green-300 ${isClicked === i ? 'gcolor' : ''} cursor-pointer my-2 p-2`}
//               key={ele._id}
//             >
//               {ele.name}
//             </li>
//           ))}
//         </ul> */}

//         <FeaturedProducts arr={filteredProducts} />
//       </div>
//      <AnchorTemporaryDrawer ></AnchorTemporaryDrawer>
//     </div>
//   );
// }
import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import { Helmet } from 'react-helmet';
import Loading from './Loading';

export default function Products({ filteredProducts, loading, msg }) {
  if (loading) return <Loading></Loading>;
  if (msg) return <h2 className='text-red-700 font-bold'>{msg}</h2>;

  return (
    <div>
      
      <FeaturedProducts arr={filteredProducts} />
    </div>
  );
}

