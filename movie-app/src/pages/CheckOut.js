import {useContext} from "react";
import {CartInfoContext} from "../contexts/CartInfoContext";

const CheckOut = ()=>{
    const {cartTotal,numCartItems} = useContext(CartInfoContext);

    return (
        <div style={{ margin: "50px" }}>
            Total Items: {numCartItems}
            <br />
            Total Price: {cartTotal}
        </div>
    );
};
export default CheckOut;