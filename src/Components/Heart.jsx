import {useWishListStore} from "../Stores/wishListStore.js";


export default function Heart({ product }){
    const toggleProduct = useWishListStore(state => state.toggleWishList);
    const isLiked = useWishListStore(state => state.wishList.some(prod => prod.id === product.id));
    return (
        <button className="cursor-pointer" onClick={(e)=>{
            e.stopPropagation()
            toggleProduct(product)
        }}>
            <i key={isLiked? "liked" : "unliked"} className={`heart ${isLiked? "fa-solid fa-heart liked" : "fa-regular fa-heart"}`}></i>
        </button>
    )
}