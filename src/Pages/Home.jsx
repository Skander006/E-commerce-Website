import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import Search from "../Components/Search.jsx";
import PrixMin from "../Components/PrixMin.jsx";
import PrixMax from "../Components/PrixMax.jsx";
import Rating from "../Components/Rating.jsx";
import CategoryCard from "../Components/CategoryCard.jsx";
import ProductCard from "../Components/ProductCard.jsx";
import {useNavigate} from "react-router-dom";


export default function Home(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] =useDebounce(searchTerm, 500);
    const [prixMin, setPrixMin] = useState(null);
    const [prixMax, setPrixMax] = useState(null);
    const [rating, setRating] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const navigate = useNavigate();
    const categories = [{title : "Men's Clothing",image : './clothing.jpg'}, {title : "Women's Clothing",image : './w-clothing.jpg'}, {title : 'Electronics', image : './electronics.jpg'}, {title : 'Jewelery', image : './jews.jpg'}];
    const fetchAllProducts = async(page, prixMin = null, prixMax = null, rating=null, search="")=>{
        setIsLoading(true);
        setError("");
        try{
            const endpoint = `https://fakestoreapi.com/products`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error("Failed to fetch the products.");
            }
            if (response.Response === false){
                setError("Failed to fetch the products.");
                return;
            }
            const PRODUCTS_PER_PAGE = 10;
            const start = (page - 1) * PRODUCTS_PER_PAGE
            const end = start + PRODUCTS_PER_PAGE;
            const data = await response.json();

            let products = data;
            products = products.slice(start, end);
            if (search.length>0){
                products = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
            }
            if (rating){
                products = products.filter(product => product.rating.rate>=rating);
            }
            if (prixMin){
                products = products.filter(product => product.price >= prixMin);
            }
            if (prixMax){
                products = products.filter(product => product.price <= prixMax);
            }

            setProducts(products || []);
            setTotalPages(data.length/PRODUCTS_PER_PAGE || []);
        } catch(error){
            setError(error.message);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllProducts(currentPage, prixMin, prixMax, rating, debouncedSearchTerm);
    }, [currentPage, prixMin, prixMax, rating, debouncedSearchTerm]);

    return(
        <div className="Home">
            <header className="Home-header">
                <h1 className="text-5xl font-bold mt-8 p-6 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent">Everything you want. One click away.</h1>
                <div className="search">
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                <div className="filters">
                    <PrixMin prixMin={prixMin} setPrixMin={setPrixMin} />
                    <PrixMax prixMax={prixMax} setPrixMax={setPrixMax} />
                    <Rating rating={rating} setRating={setRating} />
                </div>
            </header>

            <ul className="m-6 bg-gray-100 rounded-2xl shadow-md p-8 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-16">
                {categories.map((category, index) => (
                    <li key={index} onClick={()=> navigate(`/category/${index}`, {state : {category}})}>
                        <CategoryCard category={category} />
                    </li>
                ))}
            </ul>
            {isLoading? <p>Loading...</p> : (
                error? <p>Error : {error}</p> : (
                    products.length > 0? (
                        <div className="p-10 mt-12 rounded-2xl shadow-lg">
                            <div className="flex flex-col gap-12">
                                <h2 className="text-left text-4xl font-bold">Our Products</h2>
                                <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-18">
                                    {products.map((product)=>(
                                        <li key={product.id} onClick={()=> navigate(`/product/${product.id}`, {state : {product}})}>
                                            <ProductCard product={product} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pagination">
                                <button className="prev" onClick={()=>setCurrentPage((prev)=> prev===1? prev : prev-1)} disabled={currentPage===1}>Prev</button>
                                <span>{currentPage} / {totalPages}</span>
                                <button className="next" onClick={()=>setCurrentPage((prev)=>prev === totalPages? prev : prev+1)} disabled={currentPage === totalPages}>Next</button>
                            </div>
                        </div>
                    ) : <p>No products found...</p>
                )
            )}
        </div>

    )
}
