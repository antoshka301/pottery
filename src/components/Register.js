import React, {useState, useEffect} from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";


export default function CreateProfile({setToken, setLoggedIn}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function CreateNewProfile(event){
        try{
            const response = await fetch('http://localhost:4000/api/users/register', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: event.target[0].value,
                    password: event.target[1].value
                })
              })
              let result = await response.json()
              console.log(result)

              if(result.user){
                setToken(result.token)
                setLoggedIn(true)
                localStorage.setItem("token", result.token)
                navigate("/")
              } else {
                if(result.name == "PasswordLengthError") {
                    document.getElementById("createErrorMessage").innerHTML = "Password must be at least 8 characters!"

                }
                else {
                    document.getElementById("createErrorMessage").innerHTML = result.message
                }
              }
        }catch(err){
            console.log("Registration Failed!! " + err)
        }
    }

   
    return (<div className="center">
    
        <>
        
            <h2> Create a new account!</h2>
            <form onSubmit={(event)=>{
                event.preventDefault()
                CreateNewProfile(event)
            }}>
                <div className="txt_field">
                    <input type="text" required value={username} onChange={(event)=>{setUsername(event.target.value)}}></input>
                    <label>Username: </label>
                </div>
                <div className="txt_field">
                    <input type="password" required value={password} onChange={(event)=>{setPassword(event.target.value)}}></input>
                    <label>Password: </label>
                </div>
                <button className="input" type="submit">Sign Up</button>
                <br></br>
                <div id="createErrorMessage" className="errors"></div>
                <br></br>
            <div className="signup_link">
                Already have an account?<a href="../Login"> Sign in!</a>
            </div>
        </form>
        
        </>
    </div>)
}