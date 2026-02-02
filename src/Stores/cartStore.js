import {create} from "zustand/react";
import {persist} from "zustand/middleware";

export const useCartStore = create(
    persist((set, get) =>({
    cart : [],

    //add product to cart
    addToCart : (product) =>{
        const cart = get().cart;
        const existing = cart.find(c => c.id === product.id);

        if (existing){
            set({
                cart : cart.map(item => item.id === product.id? {...item, quantity : item.quantity + 1} : item)
            });
        } else{
            set({
                cart : [...cart, {...product, quantity : 1}]
            });
        }
    },

    //remove product from cart
    removeProduct : (id)=>{
        set({
            cart : get().cart.filter(item => item.id !== id)
        });
    },

    //increase value
    increaseQuantity : (id)=>{
        set({
            cart : get().cart.map(item => item.id === id? {...item, quantity : item.quantity + 1} : item)
        });
    },

    //decrease value
    decreaseQuantity : (id)=>{
        set({
            cart : get().cart.map(item => item.id === id? {...item, quantity : item.quantity - 1 } : item).filter(item => item.quantity !== 0)
        });
    },

    //clear the cart
    clearCart : ()=>{
        set({
            cart : []
        });
    },

    //total
    getTotal : ()=>{
        return get().cart.reduce((total, item) => total + item.quantity * item.price , 0).toFixed(2);
    },

    //number of articles
    articleNumbers : ()=>{
        return get().cart.length;
    }
    }),
        {
            name : "cartStore"
        }

));