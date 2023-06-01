import React, {useState} from 'react';
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Search from "./pages/Search";
import {SearchBarContext} from "./contexts/SearchBarContext";
import {FetchTMDBContextProvider} from "./contexts/FetchTMDBContext";
import {SearchBarProvider} from "./contexts/SearchBarContext";
import Cart from "./pages/Cart";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CartInfoContextProvider} from "./contexts/CartInfoContext";
import CheckOut from "./pages/CheckOut";
const App = () => {


    return (

        <div className="App" style={{
            display: "flex",
            alignItems: "center"
        }}>

            <div className="container-fluid">
                <BrowserRouter>
                    <CartInfoContextProvider>
                        <SearchBarProvider>
                            <FetchTMDBContextProvider>
                                <Routes>
                                    <Route path="/" element={<NavBar />}>
                                        <Route path="/Search" element={<Search />} />
                                        <Route path="/Cart" element={<Cart />} />
                                        <Route path="/CheckOut" element={<CheckOut />} />
                                    </Route>
                                </Routes>
                            </FetchTMDBContextProvider>
                        </SearchBarProvider>
                    </CartInfoContextProvider>
                </BrowserRouter>
            </div>
        </div>

        );
};

export default App;
