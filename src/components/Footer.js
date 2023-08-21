import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

function Footer() {
    return <div className="social-footer">
        <section className="footer">
            <div className="social">
                <a href="https://www.instagram.com/?hl=en" target="_blank"><i className="fa fa-instagram"></i></a>
                <a href="https://twitter.com/?lang=en" target="_blank"><i className="fa fa-twitter"></i></a>
                <a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a>
            </div>
            <ul className="list">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="../About">About</a>
                </li>
                {/*<li>
                    <a href="#">Join the Club</a>
                </li>*/}
                <li>
                    <a href="/Contact">Contact</a>
                </li>
            </ul>
            <p className="copyright">
                © urban mud
            </p>
        </section>
    </div>
}

export default Footer;