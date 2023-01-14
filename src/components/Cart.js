import React from "react";
// import butterbot from "../images/butterbot.png";

function Cart() {
    return (
        <>
            <div className="border">
                <div className="shopping-cart">
                    <div className="title">
                        Shopping Cart
                    </div>

                    <div className="item">
                        <div className="buttons">
                            <h2><i class="fa-solid fa-trash"></i></h2>
                        </div>

                        <div className="image">
                            {/* <img src={butterbot} alt="" width="230px" /> */}
                        </div>

                        <div className="quantity">
                            <select name="quantity" id="quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        <div className="total-price">$649.99</div>
                    </div>
                </div>
                <div className="cartpage">
                    <center><div className="checkout">Ready to checkout?</div></center>
                    <center><button className="checkout-btn"><a href="./Checkout">Checkout</a></button></center>
                    <center>Sign up for our newsletter to recieve a 15% off code!</center>
                    <center><input className="reminder" placeholder="Email"></input></center>
                    <center><button className="checkout-btn"><a href="./Error">Sign Up</a></button></center>
                </div></div>
        </>
    )
}

export default Cart;