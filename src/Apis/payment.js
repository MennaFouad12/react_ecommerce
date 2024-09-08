import axios from "axios"


// let token=localStorage.getItem('userToken')
//بعمل destructعشان مبعوتلي اوبجكت فالبراميتر بتاع الفانكشن
export function onlinepayment({cartid,shippingAddress}){
    let token=localStorage.getItem('userToken')
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,
        {shippingAddress},{headers:{token}})
       
    
}
export function cash({cartid,shippingAddress}){
    let token=localStorage.getItem('userToken')
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,
        {shippingAddress},{headers:{token}})
       
    
}
