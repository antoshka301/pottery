import React, { useState, useEffect } from "react";
import reactdomclient from "react-dom/client";
import {
  BrowserRouter,
  useNavigate,
  useParams,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default function SingleItem({
  selectedPot,
  setSelectedPot,
  selectedFile,
  setSelectedFile,
  isAdmin,
}) {

  let imgURL = "/pot";
  const navigate = useNavigate();

  const [potName, setPotName] = useState("");
  const [potPrice, setPotPrice] = useState("");
  const [potStock, setPotStock] = useState("");

  const [nameIsShown, setNameIsShown] = useState(false);
  const [priceIsShown, setPriceIsShown] = useState(false);
  const [stockIsShown, setStockIsShown] = useState(false);

  // Get pottery by id
  useEffect(() => {
    async function getPotById() {

      try {
        const response = await fetch(
          "http://localhost:4000/api/pottery/${potid}",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let data = await response.json();
        console.log("data******:", data.potid);

      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // Add pottery listing to cart
  async function addToCart(event) {
    console.log(event);

    try {
      const response = await fetch("Insert Route here-in progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();

      if (result.success) {
        alert("Item Added to Cart!");
        navigate("/");

      } else {
        document.getElementById("createErrorMessage").innerHTML =
          result.error.message;
      }

    } catch (err) {
      console.log("Could not add item to cart." + err);
    }
  }

  // Patch edit pottery listing
  async function EditPot(selectedPot) {

    try {
      const response = await fetch(
        `http://localhost:4000/api/pottery/edit/${selectedPot.potid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            potid: selectedPot.potid,
            name: potName == "" ? selectedPot.name : potName,
            price: potPrice == "" ? selectedPot.price : potPrice,
            stock: potStock == "" ? selectedPot.stock : potStock,
          },
          ),
        }
      );
      navigate("/");

    } catch (err) {
      console.log("Could not edit pottery." + err);
    }
  }

  // Delete a pottery listing
  async function deletePot(potid) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/pottery/${potid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

        }
      );
      navigate("/");
    } catch (err) {
      console.log("Could not delete pottery." + err);
    }
  }

  // Switch use effect states to trigger renders
  const handleNameClick = (event) => {
    setNameIsShown((current) => !current);
  };

  const handlePriceClick = (event) => {
    setPriceIsShown((current) => !current);
  };

  const handleStockClick = (event) => {
    setStockIsShown((current) => !current);
  };

  return (
    <>
      <div className="singlepage">
        <div className="singlesquare">
          <img src={selectedPot.image} width="300" height="300"></img>
        </div>
        <div className="potListingInfo" key={selectedPot.potid}>
          <form id="editPot"
            onSubmit={async (event) => {
              event.preventDefault();
              EditPot();
            }}
          >
            <div className="potListingName">
              {" "}
              <div className="nameandedit">
                {selectedPot.name}

                {isAdmin == "true" ? (
                  <>
                    <button
                      type="button"
                      onClick={handleNameClick} className="editbtn">
                      <i class="fa-solid fa-pen-to-square fa-xl" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
              </div>
              {nameIsShown == true ? (
                <>
                  <input
                    type="text"
                    value={potName}
                    onChange={(event) => {
                      setPotName(event.target.value);
                    }}
                  ></input>
                </>
              ) : null}
            </div>


            <div className="potListingPrice">
              {" "}
              <div className="nameandedit">
                ${selectedPot.price}

                {isAdmin == "true" ? (
                  <>
                    <button
                      type="button"
                      onClick={handlePriceClick} className="editbtn">
                      <i class="fa-solid fa-pen-to-square fa-xl" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
              </div>
              {priceIsShown == true ? (
                <>
                  <input
                    type="text"
                    value={potPrice}
                    onChange={(event) => {
                      setPotPrice(event.target.value);
                    }}
                  ></input>
                </>
              ) : null}
            </div>


            <div className="potListingStock">
              {" "}
              <div className="nameandedit">
                {selectedPot.stock} remaining in stock.

                {isAdmin == "true" ? (
                  <>
                    <button
                      type="button"
                      onClick={handleStockClick} className="editbtn">
                      <i class="fa-solid fa-pen-to-square fa-xl" aria-hidden="true"></i>
                    </button>
                  </>
                ) : null}
              </div>
              {stockIsShown == true ? (
                <>
                  <input
                    type="text"
                    value={potStock}
                    onChange={(event) => {
                      setPotStock(event.target.value);
                    }}
                  ></input>
                </>
              ) : null}
            </div>
          </form>


          <form
            onSubmit={(event) => {
              event.preventDefault();
              addToCart(event);
            }}
          >
            <div className="qtyandaddtocart">

              {isAdmin == "false" ? (
                <div className="qty">
                  {" "}
                  Qty: <span></span>
                  <select name="quantity" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              ) : null}

              {isAdmin == "false" ? (
                <button className="addtocart">
                  {" "}
                  <a href="./Cart">
                    {" "}
                    Add to Cart
                  </a>
                </button>
              ) : null}

              <br></br>
              <div id="createErrorMessage" className="errors"></div>
            </div>
          </form>


          <div className="editanddelete">
            <div>
              {isAdmin == "true" ? (
                <button
                  type="submit"
                  form="editPot"
                  onClick={(event) => {
                    event.preventDefault();
                    EditPot(selectedPot);
                  }}
                  className="login_signup_button"
                >
                  <li>Submit Edits</li>
                </button>
              ) : null}
            </div>

            <div>
              {isAdmin == "true" ? (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deletePot(selectedPot.potid);
                  }}
                  className="login_signup_button"
                >
                  <li>Delete Listing</li>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}