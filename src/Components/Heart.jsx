import {useWishListStore} from "../Stores/wishListStore.js";


export default function Heart({ product }){
    const isInWishList = useWishListStore(state => state.isInWishList);
    const toggleProduct = useWishListStore(state => state.toggleWishList);

    return (
        <div>
            <i onClick={()=>toggleProduct(product)} className={isInWishList(product)? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </div>
    )
}