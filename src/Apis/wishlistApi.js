
//add to list
import axios from "axios";


let baseUrl = `https://ecommerce.routemisr.com/api/v1`

// const token = localStorage.getItem('userToken')

export function addTolistapi(productId)
{
    const token = localStorage.getItem('userToken')
    return axios.post(`${baseUrl}/wishlist`,{productId},{
        headers:{
            token
        }
    })
}

/////get list

export function getlistApi()
{
    const token = localStorage.getItem('userToken')
    return axios.get(`${baseUrl}/wishlist`,{
        headers:{
            token
        }  
    })
}

//delete item
export function deletelistApi(id)
{
    const token = localStorage.getItem('userToken')
    return axios.delete(`${baseUrl}/wishlist/${id}`,{
        headers:{
            token
        }  
    })
}
