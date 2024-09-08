
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartApi } from "../Apis/cartApi";




export default function useMutationCart(fn) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fn,
        onSuccess: () => {
            //هنا بقوله اي ابديت هعملو سواء create ,update ,delete عدل علطول فالفانكشن اللي انا مديلها ال key دا
            queryClient.invalidateQueries({ queryKey: ['cart'] })
           if(fn===clearCartApi)
            queryClient.setQueriesData('cart',null)
        }
    })
}

// useMutation: A hook from React Query that allows you to perform a mutation operation (e.g., POST, PUT, DELETE requests) 
// and handle its lifecycle (loading, error, success states).
// useQueryClient: A hook from React Query that provides access to the query client,
//  which is used for managing query data and performing cache operations.
