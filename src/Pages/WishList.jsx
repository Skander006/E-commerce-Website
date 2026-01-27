import {useWishListStore} from "../Stores/wishListStore.js";
import {useNavigate} from "react-router-dom";
import ProductCard from "../Components/ProductCard.jsx";


export default function WishList(){
    const wishList = useWishListStore(state => state.wishList);
    const clearWishList = useWishListStore(state => state.clearWishList);
    const navigate = useNavigate();

    return (
        <div className="p-16 rounded-xl shadow-md">
            <div className="flex justify-between mb-18">
                <h1 className="p-4 text-4xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">WishList</h1>
                {wishList.length>0 &&<button className="px-6 py-4 text-white text-md rounded-xl shadow-md cursor-pointer bg-gray-500 hover:bg-gray-600 transition-all duration-300" onClick={clearWishList}>Clear Wish-List</button>}
            </div>
            {wishList.length > 0? (
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-14">
                    {wishList.map((product)=>(
                        <li className="relative" key={product.id} onClick={()=>navigate(`/product/${product.id}`, {state : {product}})}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>

            ) :<p className="text-center text-gray-700 text-2xl font-bold">No products added to your Wish-List yet...</p>
            }
        </div>
    )
}