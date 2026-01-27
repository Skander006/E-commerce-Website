import {useWishListStore} from "../Stores/wishListStore.js";
import {useNavigate} from "react-router-dom";
import ProductCard from "../Components/ProductCard.jsx";


export default function WishList(){
    const wishList = useWishListStore(state => state.wishList);
    const removeProduct = useWishListStore(state => state.removeFromWishList);
    const clearWishList = useWishListStore(state => state.clearWishList);
    const navigate = useNavigate();

    return (
        <div className="p-16 rounded-xl shadow-md">
            <div className="flex justify-between p-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">WishList</h1>
                <button onClick={clearWishList}>Clear Wish-List</button>
            </div>
            {wishList.length > 0? (
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-12">
                    {wishList.map((prod)=>(
                        <li key={prod.id} onClick={()=>navigate(`/product/${prod.id}`, {state : {prod}})}>
                            <ProductCard product={prod} />
                            <button onClick={()=>removeProduct(prod.id)}>Remove</button>
                        </li>
                    ))}
                </ul>

            ) :<p>No products added to your Wish-List yet...</p>
            }
        </div>
    )
}