import React, {useContext, useEffect, useState} from "react";
import {CartInfoContext} from "../contexts/CartInfoContext";
import Cart from "./Cart";
import axios from "axios";


const CheckOut = ()=>{
    const {numItems,cartTotal} = useContext(CartInfoContext);
    const [userEmail,setUserEmail] = useState("");
    const [userFirstName,setUserFirstName] = useState("");
    const [userLastName,setUserLastName] = useState("");
    const [showBuyHistory,setShowBuyHistory] = useState(false);
    const [buyHistory,setBuyHistory] = useState([]);
    const getCart = async()=>{
        try{
            const response = await axios.get('/debug/purchases');

            setBuyHistory(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //const {numItems, cartTotal} = useContext(CartInfoContext);
    useEffect(() => {


    },[numItems]);
    async function handleSubmit(e) {
        e.preventDefault();
        const requestData = {
            // Prepare the data to send in the request body
            // Assuming you have the firstName, lastName, and email variables defined
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            payment: cartTotal
        };

        try {
            const response = await axios.post('/debug/addPurchase',null, {
                params: {
                    firstName: userFirstName,
                    lastName:userLastName,
                    email:userEmail,
                    payment:cartTotal
                },
            });

        } catch (error) {
            // Handle network error
            console.error('Error adding purchase:', error);
        }
    }
    const handleShowBuyHistoryClick = ()=>{
        setShowBuyHistory(!setShowBuyHistory);

        getCart();

    }

    return (
        <>
            <div className='container'>
                <div className='row row-cols-1 row-cols-md-2 g-4 justify-content-center'>
            <div>
                <h2>Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

                </div>
                <div style = {{alignSelf:'center'}}>
                <button type="button" className='btn btn-outline-primary'
                        onClick={()=> handleShowBuyHistoryClick()}>
                    Show History
                </button>
                {showBuyHistory&&buyHistory.map(item =>(
                    <table>
                        <tr>
                            <td>item.firstName</td>
                            <td>item.lastName</td>
                            <td>item.email</td>
                            <td>item.payment</td>
                        </tr>
                    </table>
                ))}
                </div>
            </div>

        </>
    );
};
export default CheckOut;