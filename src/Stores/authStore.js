import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set)=>({
            user : null,
            token : null,
            isAuthenticated : false,

            login : (user,token)=>{
                set({
                    user,
                    token,
                    isAuthenticated : true
                });
            },

            logout : ()=>{
                set({
                    user : null,
                    token : null,
                    isAuthenticated : false
                });
            },

            register : (user, token)=>{
                set({
                    user,
                    token,
                    isAuthenticated : true
                });
            }
        }),
        {
            name : "auth-storage"
        }
    )
);