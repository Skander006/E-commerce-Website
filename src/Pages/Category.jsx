import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import Search from "../Components/Search.jsx";
import PrixMin from "../Components/PrixMin.jsx";
import PrixMax from "../Components/PrixMax.jsx";
import Rating from "../Components/Rating.jsx";
import ProductCard from "../Components/ProductCard.jsx";


export default function Category(){
    const { state } = useLocation();
    const category = state?.category;
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prixMin, setPrixMin] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [prixMax, setPrixMax] = useState(null);
    const [rating, setRating] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();
    const fetchCategoryProducts = async(page, prixMin = null, prixMax = null, rating=null, search="")=>{
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

            //filters
            if (search.length>0){
                products = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
            }
            if (rating !== null){
                products = products.filter(product => product.rating.rate>=rating);
            }
            if (prixMin !== null){
                products = products.filter(product => product.price >= prixMin);
            }
            if (prixMax !== null){
                products = products.filter(product => product.price <= prixMax);
            }

            products = products.filter(product => product.category.toLowerCase() == category.title.toLowerCase());
            //pagination
            const PRODUCTS_PER_PAGE = 10;
            const start = (page - 1) * PRODUCTS_PER_PAGE
            const end = start + PRODUCTS_PER_PAGE;

            products = products.slice(start, end);



            setProducts(products || []);
            setTotalPages(Math.ceil(data.length/PRODUCTS_PER_PAGE) || 0);
        } catch(error){
            setError(error.message);
        }
        finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchCategoryProducts(currentPage, prixMin, prixMax, rating, debouncedSearchTerm);
    }, [currentPage, prixMin, prixMax, rating, debouncedSearchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [prixMin, prixMax, debouncedSearchTerm, rating]);

    return (
        <div
            className="bg-cover bg-center bg-no-repeat rounded-2xl shadow-md p-8"
            style={{
                backgroundImage: `
      linear-gradient(to right,
        ${
                    category.title.toLowerCase() === "men's clothing"
                        ? "#91bbef"
                        : category.title.toLowerCase() === "women's clothing"
                            ? "#f3add2"
                            : category.title.toLowerCase() === "electronics"
                                ? "#451bdd"
                                : category.title.toLowerCase() === "jewelery"
                                    ? "#edce64"
                                    : "transparent"
                },
        #CCC8C8
      ),
      url('/bg.jpg')
    `,
            }}
        >

        <header className="Home-header">
                {!category? <p>Category not found...</p> :  <h1 className= "text-5xl font-bold mt-8 p-6 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent">{category.title}</h1>}

                <div className="search">
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                <div className="filters">
                    <PrixMin prixMin={prixMin} setPrixMin={setPrixMin} />
                    <PrixMax prixMax={prixMax} setPrixMax={setPrixMax} />
                    <Rating rating={rating} setRating={setRating} />
                </div>
            </header>

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