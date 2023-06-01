import React, { createContext, useState, useEffect } from 'react'

export const CartInfoContext = createContext();

export const CartInfoContextProvider = ({children}) => {
    const [cartTotal,setCartTotal] = useState(0);
    const [numCartItems,setNumCartItems] = useState(0);
    return(
        <>
            <CartInfoContext.Provider value ={{cartTotal,setCartTotal,numCartItems,setNumCartItems}}>
                {children}
            </CartInfoContext.Provider>
        </>
    );
}