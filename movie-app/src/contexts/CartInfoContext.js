import React, {createContext, useEffect, useReducer, useState} from 'react';
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";


export const CartInfoContext = createContext();

export const CartInfoContextProvider = ({ children }) => {

    const [numItems, setNumItems] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    const handleRemoveFromCart = ()=>{
        setNumItems((num)=>num-1);
    }
    const handleAddToCart = ()=>{
        setNumItems((num)=>num+1);
    }
    useEffect(()=>{

    },[numItems])
    return (
        <CartInfoContext.Provider value = {{numItems,setCartTotal,cartTotal,handleRemoveFromCart,handleAddToCart}}
        >
            {children}
        </CartInfoContext.Provider>
    );
};
