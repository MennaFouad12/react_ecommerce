import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCartApi } from "../Apis/cartApi";




export default function useMutationWishlist(fn) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: fn,
        onSuccess: () => {
            //هنا بقوله اي ابديت هعملو سواء create ,update ,delete عدل علطول فالفانكشن اللي انا مديلها ال key دا
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
           
        }
    })
}