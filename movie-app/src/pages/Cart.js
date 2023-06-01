import React, {useState, useRef, useEffect, useContext} from 'react'


import "../style/Search.css"

import axios, {post} from "axios";
import {CartInfoContext} from "../contexts/CartInfoContext";


const imagePath = 'https://image.tmdb.org/t/p/original'
const Cart = () => {

    const [cartItems,setCartItems] = useState([]);
    const cartInfo = useContext(CartInfoContext);

    const getCart = async()=>{
        try{
            const response = await axios.get('/api/getCart');

            setCartItems(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getCartTotal = async()=>{
        try {
            const response = await axios.get('/api/getCartTotal');

            cartInfo.setCartTotal(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    function updateCart(){
        getCart();
        getCartTotal();
    }
    const removeFromCart = async(id)=>{
        try{
            const response = await axios.get('/api/removeCartItem',{
                params:{
                    id:id
                },
            });

            cartInfo.handleRemoveFromCart();
            updateCart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const clearCart = async()=>{
      try {
          const response = await axios.get('/api/clearCart');


          updateCart();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const handleCheckOutClick = ()=>{
        window.location.href = '/CheckOut';
    }
    useEffect(() => {
        updateCart();
    },[]);

    return(
    <>
            <div className="row" style = {{marginBottom : '25px'}}>
                <h3 className="col-4">Total: {cartInfo.cartTotal}</h3>
                <button  type="button" onClick = {()=>handleCheckOutClick()} className='btn btn-outline-primary col-4'>Checkout</button>

                <button type="button"  className='btn btn-outline-danger col-4'
                    onClick={()=>clearCart()}>Clear Cart</button>
            </div>
        <div className="row" style = {{margin : '50px'}}>
            <div className='container'>
                <div className='row row-cols-1 row-cols-md-2 g-4 justify-content-center'>
                    {cartItems?cartItems.map(item => (
                        <div className='card col' key={item.id}>
                            <img src={imagePath + item.image} className="card-img-top" alt="img"/>
                            <div className="card-body" >
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.desc}</p>
                                <p className="card-text">released: {item.release}</p>
                                <p className="card-text">price: 3.99</p>
                            </div>
                            <button type="button" className='btn btn-outline-secondary'
                                  onClick={()=>removeFromCart(item.id)}>
                                remove from cart</button>
                        </div>
                    )):<h1>cart is empty</h1>}
                </div>
            </div>
        </div>
    </>
    );
};
export default Cart;