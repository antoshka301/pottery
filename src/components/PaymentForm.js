import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'

// Style - card payment screen
const CARD_OPTIONS = {

    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fff" },
            "::placeholder": { color: "#fff" }
        },
        invalid: {
            iconColor: "fff",
            color: "#fff"
        }
    }
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {

            try {
                const { id } = paymentMethod
                const response = await axios.post("http://ec2-52-15-98-37.us-east-2.compute.amazonaws.com:4000/payment", {
                    amount: 1000,
                    id
                })

                if (response.data.success) {
                    console.log("Successful payment.")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }

        } else {
            console.log(error.message)
        }
    }

    function showAlert() {
        alert("Payment successful. ");
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset id="FormGroup">
                        <div id="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>

                    <button onClick={() => { showAlert(); }} className="purchase"><a href="./About">Pay</a></button>
                </form>
                :
                <div>
                    <h2>You just bought pottery!</h2>
                </div>
            }

        </>
    )
}