import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function Home({ pottery, setPottery, selectedPot, setSelectedPot, isAdmin, selectedFile, setSelectedFile }) {
    let imgURL = "/pot"

    useEffect(() => {
        async function getPottery() {

            try {
                const response = await fetch('http://localhost:4000/api/pottery')
                let data = await response.json()
                console.log("data******:", data)
                setPottery(data)

            } catch (err) {
                console.log(err)
            }
        }
        getPottery()
    }, [])

    async function getImageUrl(fileName) {
        const storageRef = ref(storage, fileName);
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL)

    }

    return (
        <>
            <div className="home_image"><img src="https://firebasestorage.googleapis.com/v0/b/emilia-pottery.appspot.com/o/home.jpg?alt=media&token=c978ef60-d390-4334-b86d-967a4b9694ec"></img></div>
            <div className="posts">
                {
                    pottery?.map((pot) => {
                        return (
                            <div key={pot.potid} className="post">
                                <div className="potInfo">
                                    <Link to="./SingleItem" onClick={() => setSelectedPot(pot)}> <img src={pot.image} ></img> </Link>
                                    <div className="potName"><Link to="./SingleItem" onClick={() => setSelectedPot(pot)}> {pot.name} </Link></div>
                                </div>
                                <div className="potPrice"><div>${pot.price}</div>
                                    {/* <div>{pot.stock} left!</div> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}