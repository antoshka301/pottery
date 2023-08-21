import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


export default function Navbar({ loggedIn, Logout, isAdmin, setIsAdmin }) {

    // to change burger classes
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked")
    const [menuClass, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    const hideMenu = () => {
        setIsMenuClicked(false)
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
    }

    useEffect(() => {
        document.body.style.overflow = 'unset';
        if (isMenuClicked) {
            document.body.style.overflow = 'hidden';
        }
    }, [isMenuClicked]);

    return (
        <>
            <div className="title">
                <div className="burger">
                    <div className="burger-menu" onClick={updateMenu}>
                        <div className={burgerClass}></div>
                        <div className={burgerClass}></div>
                        <div className={burgerClass}></div>
                    </div>
                </div>

                <Link to="/" onClick={hideMenu}>
                    <div className="title_image"><img className="home_image" src="https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/logo.png?alt=media&token=8db262b0-c873-4e36-8999-ce8f52c68120"></img></div>
                </Link>
                <div className="user_cart_images">
                    {/* <i class="fa-solid fa-user fa-xl"></i> */}
                    <a href="./Cart">
                        <i className="fa-solid fa-cart-shopping fa-xl" ></i>
                    </a>

                </div>

            </div>
            <div className={menuClass}>
                <div className="links-menu">
                    <a href="./"> Home </a>
                    <a href="./About"> About </a>
                    {isAdmin == "true" ? (<a href="./Create"> Create a Listing </a>) : null}
                    {!loggedIn ? <a href="./Login"> Login </a> : <a href onClick={Logout}> Logout </a>}
                </div>
            </div>
        </>
    )
}