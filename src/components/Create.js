import React, { useState } from "react";
import reactdomclient from "react-dom/client"
import { token, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const server_url = `http://localhost:4000/api/pottery/create`;

export default function Create({ isAdmin }) {
  const navigate = useNavigate()

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const metadata = { contentType: "image/jpeg" };

  async function uploadImage() {

    try {
      let imageName = uuidv4() + ".jpg";
      setImageURL(imageName)
      const storageRef = ref(storage, imageName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile[0], metadata);
      uploadTask.on("state_changed", null, null, complete);

      async function complete() {
        console.log("upload complete!");
        let url = await getImageUrl(imageName)
        newPot(url)
      }

    } catch (err) {
      console.log(err);
    }
  }

  async function getImageUrl(fileName) {
    const storageRef = ref(storage, fileName);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL
  }

  async function saveImageName(url) {
    const response = await fetch(`${server_url}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    });
  }

  async function getImageUrl(fileName) {
    const storageRef = ref(storage, fileName);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL
  }

  async function saveImageName(url) {
    const response = await fetch(`${server_url}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    });
  }

  // Create pottery listing
  async function newPot(imageName) {
    try {
      console.log(localStorage.getItem("token"))
      console.log("selectedfile: ", selectedFile)
      console.log(
        name,
        price,
        stock,
        imageName
      )

      console.log("imageURL: ", imageName)
      const response = await fetch(`${server_url}/`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          body: JSON.stringify({

            name: name,
            price: price,
            stock: stock,
            image: imageName
          })
        }
      );

      let result = await response.json();
      console.log(result);

      if (result) {
        alert("Your listing has been created. You will now be routed back to the home page.")
        navigate("/")

      } else {
        console.log("nope")
        document.getElementById("createErrorMessage").innerHTML =
          result.error.message;
      }

    } catch (err) {
      console.log("Couldn't create new creature!" + err);
    }
  }

  return (<div className="createpage">
    <div className="createform">
      <>
        {
          <form
            className="createsquare"
            onSubmit={async (event) => {
              event.preventDefault();
              await uploadImage();
            }}>
            <div>
              <h1>Create a Listing</h1>
              <br></br>
              <h2>Listing Name:</h2>

              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setname(event.target.value);
                }}
              ></input>

              <br></br><br></br>
              <h2>Price:</h2>
              <input
                type="text"
                value={price}
                onChange={(event) => {
                  setprice(event.target.value);
                }}
              ></input>

              <br></br><br></br>
              <h2>Quantity Available:</h2>
              <input
                type="text"
                value={stock}
                onChange={(event) => {
                  setstock(event.target.value);
                }}
              ></input>

              <br></br><br></br>
              <label>Image:</label>
              <br></br>
              <input
                type="file"
                onChange={(event) => {
                  setSelectedFile(event.target.files);
                }}
              ></input>

              <br></br>
              <br></br>
              <button className='login_signup_button' type="submit">
                <li>Create</li>
              </button>
              <div id="createErrorMessage" ></div>
            </div>
          </form>
        }
      </>
    </div></div>
  )
}