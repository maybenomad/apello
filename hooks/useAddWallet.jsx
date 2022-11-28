import { useState } from "react"
import { useAuthContext } from "./useAuthContext";



export const useAddWallet =  ()=>{

    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const { dispatch } = useAuthContext();

    const addWallet = async (type, adress) => {
        setError(null);
        setIsloading(true);

        const response = await fetch('https://apello.xyz:4000/api/wallets',{
            method :'POST',
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
            body : JSON.stringify({type, adress})
        });
        const json= await response.json();
        console.log('new wallet added',json);

        if(response.ok){
            // save the wallet to the local storage
            localStorage.setItem('auth',JSON.stringify(json));
            //update the auth context
            dispatch({type: 'CONNECT_WALLET', payload: json});
            setIsloading(false);

        }
        if(!response.ok){
            setIsloading(false);
            setError(json.err);
        }
        
    }

    return { addWallet, isLoading, error};
}