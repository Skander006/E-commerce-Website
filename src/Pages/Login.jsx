import {useAuthStore} from "../Stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export default function Login(){
    const login = useAuthStore(state => state.login);
    const isAuth = useAuthStore(state => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth){
            navigate("/home");
        }
    }, [isAuth, navigate]);
    const handleSubmit = (e)=>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!password || !email){
            alert("Please enter a valid email and password");
            return;
        }
        else if (password.length < 6){
            alert("Password must be at least 6 characters");
            return;
        }
        else if (!email.contains('@')){
            alert("Please enter a valid email address");
            return;
        }
        login({ email, name : "User Test"}, "fake-jwt-token");
        isAuth && navigate("/home");
    };

    return (
        <div className="flex flex-col justify-center items-center gap-26 p-14 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-18">
                <input className="py-4 px-8 text-lg bg-gray-300 outline-0 rounded-lg shadow-md w-100 focus:border-1 focus:border-gray-600 transition-all duration-300" name="email" type="email" placeholder="Email..." />
                <input className="py-4 px-8 text-lg bg-gray-300 outline-0 rounded-lg shadow-md w-100 focus:border-1 focus:border-gray-600 transition-all duration-300" name="password" type="password" placeholder="Password..." />
                <button type="submit" className="bg-gray-900 text-lg text-white py-3 px-8 rounded-lg shadow-md cursor-pointer hover:bg-gray-950 transition-all duration-300">Login</button>
            </form>
        </div>

    );
}
