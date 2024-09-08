// import React, { useState, useEffect } from 'react';
// import Products from './Products';
// import AnchorTemporaryDrawer from './Sidebar';
// import { getCategories } from '../Apis/getCategories'; // Ensure you import the right API functions
// import { getProductwithCategories } from '../Apis/getProducts';
// export default function Ourproducts() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState('');
  

//   async function fetchCategories() {
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

//   async function fetchProductsByCategory(id) {
//     setLoading(true);
//     let data = await getProductwithCategories(id);
//     if (data?.data) {
//       setFilteredProducts(data?.data);
//       setMsg('');
//     } else {
//       setMsg(data?.message);
//     }
//     setLoading(false);
//   }


//   useEffect(() => {
//     fetchCategories();
//     // getProductApi()
//   }, []);

//   useEffect(() => {
//     if (selectedCategoryId) {
//       fetchProductsByCategory(selectedCategoryId);
//     }
//   }, [selectedCategoryId]);

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
//       <AnchorTemporaryDrawer categories={categories} onSelectCategory={setSelectedCategoryId} />
      
//       <Products filteredProducts={filteredProducts} loading={loading} msg={msg} />

//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import Products from './Products';
import AnchorTemporaryDrawer from './Sidebar';
import { getCategories } from '../Apis/getCategories'; // Ensure you import the right API functions
import { getProducts, getProductwithCategories } from '../Apis/getProducts';
import { Helmet } from 'react-helmet';

export default function Ourproducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Add state to store all products
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  let [msg2, setMsg2] = useState('')
  let [loading2, setloading2] = useState(false)
  async function getProductApi() {
    setloading2(true)
    let data = await getProducts()
    console.log(data);

    if (data?.data) {
      setAllProducts(data?.data)
      setMsg2('')
      setloading2(false)
      console.log('test');

    }


    else {
      setMsg2(data?.message)
      setloading2(false)
    }
  }

  async function fetchCategories() {
    setLoading(true);
    let data = await getCategories();
    if (data?.data) {
      setCategories(data?.data);
      setMsg('');
    } else {
      setMsg(data?.message);
    }
    setLoading(false);
  }

  async function fetchProductsByCategory(id) {
    setLoading(true);
    let data = await getProductwithCategories(id);
    if (data?.data) {
      setFilteredProducts(data?.data);
      setAllProducts(data?.data); // Store the fetched products in allProducts
      setMsg('');
    } else {
      setMsg(data?.message);
    }
    setLoading(false);
  }

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter products based on search query
    if (query) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts); // Reset to original products if query is empty
    }
  }

  useEffect(() => {
    fetchCategories();
    getProductApi();
    // Optional: Fetch products if you want to show all products initially
    // getProductApi();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <form className="max-w-lg mx-auto my-7">
        <div className="flex">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
              placeholder="Search"
              required
            />
            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-700 rounded-e-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <AnchorTemporaryDrawer categories={categories} onSelectCategory={setSelectedCategoryId} />
      
      <Products filteredProducts={filteredProducts} loading={loading} msg={msg} />
    </div>
  );
}
