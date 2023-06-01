import * as React from 'react'
import SearchBarComponent from "../components/SearchBar";
import {createContext,useState} from "react";
// A context that holds the count
export const SearchBarContext = createContext()
function SearchBarProvider({children}) {

    return <SearchBarContext.Provider value ={{SearchBarComponent}}>

        {children}
    </SearchBarContext.Provider>
}

export {SearchBarProvider};