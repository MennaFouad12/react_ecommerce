import axios from "axios";


export async function getProducts()
{
    try {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        
        return data
        
    } catch (error) {
          return error?.message
    }
}

export async function getSingleProduct(id)
{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        return data
        
    } catch (error) {
          return error?.message
    }
}

//بيجيب كل ال products اللي فالكاتيجوري بتاع المنتج اللي انا باعته ال id بتاعه
export async function getProductwithCategories(id)
{
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        return data
        
    } catch (error) {
          return error?.message
    }
}