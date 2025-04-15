import type {Admin} from "~/client";

export const useUser = ()  =>{
    return useState<Admin | null>('user', ()=>{
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) as Admin : null;
    })
}