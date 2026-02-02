import {Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import {useEffect, useState} from "react";
import Category from "./Pages/Category.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import About from "./Pages/About.jsx";
import Cart from "./Pages/Cart.jsx";
import {useCartStore} from "./Stores/cartStore.js";
import WishList from "./Pages/WishList.jsx";
import Login from "./Pages/Login.jsx";
import {useAuthStore} from "./Stores/authStore.js";
import Logout from "./Pages/Logout.jsx";

export default function App(){

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState("");
    const navigate = useNavigate();
    const productsNumber = useCartStore(state => state.articleNumbers);
    useEffect(() => {
        document.body.className = open? "opacity-80 ": "opacity-100";
        return () => {
            document.body.className = "";
        };
    }, [open]);

    const isAuth = useAuthStore(state => state.isAuthenticated);

    const categories = [{title : "Men's Clothing",image : './clothing.jpg'}, {title : "Women's Clothing",image : './w-clothing.jpg'}, {title : 'Electronics', image : './electronics.jpg'}, {title : 'Jewelery', image : './jews.jpg'}];
    return (
        <>
            {isAuth ? (
                <div className="flex justify-around items-center gap-12">
                    <div className="">
                        <div onClick={()=>setOpen(!open)} className="flex justify-center items-center gap-4 text-2xl font-bold h-20 cursor-pointer hover:text-gray-700 hover:px-8 hover:rounded-xl hover:shadow-md hover:border-gray-600 transition-all duration-300">
                            <i className={open? "fa-solid fa-x" : "fa-solid fa-bars"}/>
                            <p>{open2 || "ALL"}</p>
                        </div>
                        <div className={open?"flex transition-all duration-300" : "hidden transition-all duration-300"}>
                            <ul className="flex flex-col justify-baseline items-baseline gap-6 p-8 rounded-lg shadow-md">
                                {categories.map((category, index)=>(
                                    <li key={index}
                                        onClick={()=> {
                                            setOpen2(category.title);
                                            navigate(`/category/${index}`, {state : {category}});
                                        }
                                        }
                                        className="flex justify-center items-center gap-2 text-lg text-gray-800 font-medium cursor-pointer hover:font-bold hover:text-black transition-all duration-300">
                                        {category.title} <i className="fa-solid fa-angle-right"></i>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className="p-6 flex-2">
                        <nav className="rounded-xl shadow-lg flex justify-around items-center gap-16 p-6">
                            <NavLink to="/home"
                                     onClick={()=>setOpen2("")}
                                     className={({isActive}) => isActive ? "font-bold underline text-black text-2xl" : "text-xl font-medium text-gray-800 hover:scale-102 transition-all duration-300"}>Home</NavLink>
                            <NavLink to="/about"
                                     onClick={()=>setOpen2("")}
                                     className={({isActive}) => isActive ? "font-bold underline text-black text-2xl" : "text-xl font-medium text-gray-800 hover:scale-102 transition-all duration-300"}>About
                                Us</NavLink>
                            <NavLink to="/wishlist"
                                     onClick={()=>setOpen2("")}
                                     className={({isActive}) => isActive ? "font-bold underline text-black text-2xl" : "text-xl font-medium text-gray-800 hover:scale-102 transition-all duration-300"}>Wish-List</NavLink>
                        </nav>

                    </div>
                    <div className="relative hover:text-gray-700 transition-all duration-250" onClick={()=> navigate('/cart')}>
                        <i className="fa-solid fa-cart-shopping cart cursor-pointer"></i>
                        <div className="absolute z-10 bottom-full left-1/2">
                            <p className="px-1.5 py-0 rounded-full opacity-90 bg-yellow-500 cursor-pointer text-gray-800">{productsNumber()}</p>
                        </div>
                    </div>
                    <div>
                        <Logout />
                    </div>

                </div>
            ) : (
                <div>

                </div>
            )}



            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishList" element={<WishList />} />
            </Routes>
        </>
    )
}