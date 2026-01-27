import {create} from "zustand/react";
import {persist} from "zustand/middleware";


export const useWishListStore = create(
    persist((set,get)=>({
        wishList : [],
        toggleWishList : (product)=>{
            const wishList = get().wishList;
            const existing = wishList.find(prod => prod.id === product.id);
            if (existing){
                set({
                    wishList : wishList.filter(prod => prod.id !== existing.id)
                });
            } else{
                set({
                    wishList : [...wishList, product]
                });
            }
        },
        isInWishList : (product)=>{
            return get().wishList.some(prod => prod.id === product.id);
        },

        clearWishList : ()=>{
            set({
                wishList : []
            });
        }

    }),
        {
            name : "wish-list"
        }
        )
);