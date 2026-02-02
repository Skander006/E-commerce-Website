import {useAuthStore} from "../Stores/authStore.js";
import {useNavigate} from "react-router-dom";


export default function Logout(){
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    return (
        <button className="p-6" onClick={()=>{
            logout();
            navigate("/");
        }}>Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
    );
}