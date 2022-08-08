import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client"
import { BrowserRouter, useNavigate, useParams, Routes, Route, Link } from "react-router-dom";



export default function SingleItem({ selectedCreature, setSelectedCreature, selectedFile, setSelectedFile, isAdmin }) {
    let imgURL = "/creature"
    const navigate = useNavigate();

    const [creatureName, setCreatureName] = useState('');
    const [creaturePrice, setCreaturePrice] = useState('');
    const [creatureStock, setCreatureStock] = useState('');
    const [creatureEnvironment, setCreatureEnvironment] = useState('');
    const [creatureSize, setCreatureSize] = useState('');
    const [creatureFood, setCreatureFood] = useState('');
    const [creatureTemper, setCreatureTemper] = useState('');

    const [nameIsShown, setNameIsShown] = useState(false);
    const [priceIsShown, setPriceIsShown] = useState(false);
    const [stockIsShown, setStockIsShown] = useState(false);
    const [environmentIsShown, setEnvironmentIsShown] = useState(false);
    const [sizeIsShown, setSizeIsShown] = useState(false);
    const [foodIsShown, setFoodIsShown] = useState(false);
    const [temperIsShown, setTemperIsShown] = useState(false);

    useEffect(() => {
        async function getCreaturebyId() {
            //console.log('creatureid', creatureid)
            try {
                //UPDATE URL 
                const response = await fetch('http://localhost:4000/api/creatures/${creatureid}' , {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let data = await response.json()
                console.log("data******:", data.creatureid)
                //setCreatures(data.creatureid)
            } catch (err) {
                console.log(err)
            }
        }

        //getCreaturebyId()
    }, [])

    async function addToCart(event){
        console.log(event);
        try{
            const response = await fetch('INSERT ROUTE HERE, DUMMY', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                
              })
              let result = await response.json()
              if(result.success){
                  alert("Item Added to Cart!")
                  navigate("/")
                  
              }else{
                document.getElementById("createErrorMessage").innerHTML = result.error.message
              }
  
        }catch(err){
            console.log("Could not add item to cart!" + err)
        }
      }

    // async function EDIT/PATCH creature  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
    async function EditCreature(event) {
        try {
            const response = await fetch('http://localhost:4000/api/creatures/edit/${creatureid}', {

                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    creature: {
                        creatureid: selectedCreature.creatureid,
                        name: creatureName,
                        price: creaturePrice,
                        stock: creatureStock,
                        environment: creatureEnvironment,
                        size: creatureSize,
                        food: creatureFood,
                        temper: creatureTemper,
                        // image: event.target[8].value,
                    }
                })

            })
            let result = await response.json()
            if (result.success) {
                alert("Your creature has been updated!")
                navigate("/")

            } else {
                document.getElementById("createErrorMessage").innerHTML = result.error.message
            }

        } catch (err) {
            console.log("Could not edit creature! " + err)
        }
    }

    // async function DELETE A CREATURE  --  HARLEY/EMILIA, CAN YOU LOOK AT THIS?  NOT SURE THAT THIS IS CORRECT.
    async function DeleteCreature(event) {
        try {
            const response = await fetch(`http://localhost:4000/api/creatures` + selectedCreature.creatureid, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }

            })
            let result = await response.json()
            if (result.success) {
                alert("Your creature has been deleted!")
                navigate("/")

            } else {
                document.getElementById("createErrorMessage").innerHTML = result.error.message
            }

        } catch (err) {
            console.log("Could not delete creature! " + err)
        }
      }

    const handleNameClick = event => {
        setNameIsShown(current => !current);
    };

    const handlePriceClick = event => {
        setPriceIsShown(current => !current);
    };

    const handleStockClick = event => {
        setStockIsShown(current => !current);
    };

    const handleEnvironmentClick = event => {
        setEnvironmentIsShown(current => !current)
    };

    const handleSizeClick = event => {
        setSizeIsShown(current => !current);
    };

    const handleFoodClick = event => {
        setFoodIsShown(current => !current);
    };

    const handleTemperClick = event => {
        setTemperIsShown(current => !current);
    };


    function Box() {
        return (
            <div>
                <h2>Box</h2>
            </div>
        );
    }


    return (
        <><center>
            <p>Single Item Page</p>
            <br></br><br></br><br></br>
            <div className="single">
                <div key={selectedCreature.creatureid}>
                    <img src={selectedCreature.image} width="300" height="300"></img>
                    <div className="beastid"> Name: {selectedCreature.name}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handleNameClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {nameIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreatureName(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                    <div className="beastid"> Price: ${selectedCreature.price}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handlePriceClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {priceIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreaturePrice(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                    <div className="beastid"> Quantity Available: {selectedCreature.stock}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handleStockClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {stockIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreatureStock(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                    <div className="beastid"> Optimal Environment: {selectedCreature.environment}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handleEnvironmentClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {environmentIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreatureEnvironment(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                    <div className="beastid"> Size: {selectedCreature.size}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handleSizeClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {sizeIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreatureSize(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                    <div className="beastid"> Type of Food: {selectedCreature.food}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handleFoodClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {foodIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreatureFood(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                    <div className="beastid"> Temperament: {selectedCreature.temper}
                        {isAdmin == "true" ? (
                            <>
                                <button
                                    onClick={handleTemperClick}
                                    className="editbtn">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button></>
                        ) : null}
                        {temperIsShown == true ?
                            <>
                                <br></br>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setCreatureTemper(event.target.value);
                                    }}
                                ></input>
                            </> : null}
                    </div>
                </div>

                <form onSubmit={(event) => {
                    event.preventDefault()
                    addToCart(event)
                }}>
                    <div><div> Qty:

                        <select name="quantity" id="quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select></div>
                        <button className="addtocart"> <a href="./Cart"> Buy Now <i class='fa fa-cart-shopping'></i></a></button>
                        <br></br>
                        <div className="signup_link"> <a href="../"> Back to Creatures Homepage</a></div>
                        <div id="createErrorMessage" className="errors"></div>

                        <br></br></div>
                </form>

                <div>
                    {isAdmin == "true" ? (
                        <button className="deletebtn">
                            Edit
                        </button>
                    ) : null}
                </div>
                <div>
                {isAdmin == "true" ? (
                        <button className="deletebtn">
                            Delete
                        </button>
                    ) : null}
                </div>
            </div></center>
        </>
    )
}