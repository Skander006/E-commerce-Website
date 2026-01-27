import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductCard from "../Components/ProductCard.jsx";
import {useCartStore} from "../Stores/cartStore.js";

export default function ProductDetails(){
    const { state } = useLocation();
    const product = state?.product;
    const category = product.category;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const addToCart = useCartStore(state => state.addToCart);

    const fetchCategoryProducts = async()=>{
        setIsLoading(true);
        setError("");
        try{
            const endpoint = `https://fakestoreapi.com/products`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error("Failed to fetch the products.");
            }

            const data = await response.json();

            let products = data;
            products = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
            products = products.filter(produit => produit.id !== product.id);
            setProducts(products || []);
        } catch(error){
            setError(error.message);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryProducts();
    }, []);
    return (
        <div className="flex max-w-screen-xl flex-col justify-center items-center gap-16 mt-6 p-26 rounded-2xl shadow-xl bg-gray-100">
            <div className="product-details">
                <div className="image-container">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="right-side">
                    <div className="flex justify-center items-baseline gap-10">
                        <h1>{product.title}</h1>
                        <div className="relative mt-2 group">
                            <i className="fa-solid fa-circle-info info cursor-pointer text-gray-600"></i>
                            <div className="absolute z-10 left-1/2 top-full -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-sm text-gray-700 text-center px-6 py-2 rounded-xl shadow-lg">
                                Category : {product.category}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-80">
                        <p className="font-bold ">{product.price.toFixed(2)}$</p>
                        <div className="rating">
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <p className="text-gray-700">{product.rating.rate.toFixed(1)}</p>
                        </div>
                    </div>
                    <div className="product-description">
                        <h3 className="font-semibold text-xl">Description</h3>
                        <p className="text-gray-800">{product.description}</p>
                    </div>
                    <div>
                        <button className="w-100 text-center bg-gray-950 text-white text-lg rounded-2xl shadow-md hover:text-black hover:bg-gray-300 transition-all duration-300 cursor-pointer p-4"
                                onClick={()=>{
                                        addToCart(product);
                                        navigate('/cart');
                                }
                        }>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                {isLoading? <p>Loading...</p> : (
                    error?<p>{error}</p> : (
                        products.length > 0? (
                            <div className="flex flex-col justify-baseline items-baseline gap-12">
                                <h1 className="text-3xl font-bold ">More products like this</h1>
                                <ul className="max-w-screen-lg grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
                                    {products.map((product)=>(
                                        <li key={product.id} onClick={()=> navigate(`/product/${product.id}`, {state : {product}})}>
                                            <ProductCard product={product} />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        ) : <p>No products found...</p>
                    )
                )}
            </div>
        </div>

    )
}