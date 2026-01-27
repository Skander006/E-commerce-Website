import {useCartStore} from "../Stores/cartStore.js";


export default function Cart(){
    const cart = useCartStore(state => state.cart);
    const removeCart = useCartStore(state => state.removeProduct);
    const increaseQuantity = useCartStore(state => state.increaseQuantity);
    const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
    const clearCart = useCartStore(state => state.clearCart);
    const getTotal = useCartStore(state => state.getTotal);


    return (
        <div className="text-center p-18 rounded-3xl shadow-2xl flex flex-col gap-18 mt-10">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Cart</h1>
                {cart.length>0 &&<button className="px-6 py-4 text-white text-md rounded-xl shadow-md cursor-pointer bg-gray-500 hover:bg-gray-600 transition-all duration-300" onClick={clearCart}>Clear Cart</button>}
            </div>
            {cart.map((item)=>(
                <div className="flex justify-between items-center rounded-xl shadow-lg px-16 py-6 mb-4">
                    <div className="flex justify-center items-center gap-14">
                        <img className="w-25 h-33 bg-cover bg-center" src={item.image} alt={item.title} />
                        <div className="flex flex-col justify-baseline items-baseline gap-4">
                            <h4 className="text-xl font-bold text-left">{item.title}</h4>
                            <p className="font-bold">{(item.price * item.quantity).toFixed(2)} $</p>
                        </div>

                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 ">
                        <div>
                            <button className="px-5 py-3 rounded-xl shadow-md cursor-pointer bg-red-900 text-white hover:bg-red-950 transition-all duration-300" onClick={()=>removeCart(item.id)}>Remove</button>
                        </div>
                        <div className="flex justify-center items-center gap-4 text-lg">
                            <button className="text-gray-800 bg-gray-400 px-4 py-2 rounded-xl shadow-md cursor-pointer hover:bg-gray-500 transition-all duration-300" onClick={()=>decreaseQuantity(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="text-gray-800 bg-gray-400 px-4 py-2 rounded-xl shadow-md cursor-pointer hover:bg-gray-500 transition-all duration-300" onClick={()=>increaseQuantity(item.id)}>+</button>
                        </div>
                    </div>

                </div>
            ))}
            <div className="">
                {cart.length>0? <h1 className="text-right text-xl font-bold mt-12">Total : {getTotal()} $</h1> : <h1 className="text-center text-gray-700 text-2xl font-bold">No products added to the cart yet...</h1>}
            </div>
        </div>
    )
}