//Author: Jake Scott
//Purpose: Allow a user to fill our a payment form.
//Methods: GET, POST
import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const PaymentForm = props => {
    const merchant_name = useRef();
    const account_number = useRef();
    const exp_date = useRef();
    const { isAuthenticated } = useSimpleAuth();

    const today = new Date().setHours(0,0,0,0)

    const createPayment = e => {
        e.preventDefault();
        if (isAuthenticated() & (new Date(exp_date.current.value) <= today)) {
          alert("Please provide a card with a date in the future")}
          else {
            fetch(`http://localhost:8000/paymenttypes`, {
                "method": "POST",
                "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                },
                "body": JSON.stringify({
                "merchant_name": merchant_name.current.value,
                "account_number": account_number.current.value,
                "exp_date": exp_date.current.value,

            })
            })
                .then(response => response.json())
                .then((response) => {
                  // console.log("error" in response)
                  if("error" in response === true){
                    alert("The expiration date is in the past")
                  } else{
                    props.history.push("/mysettings")
                  }
                })

        }
    }

  return (
    <>
      <h1>Create a Payment Option</h1>
      <form className="categoryList" onSubmit={
        createPayment
      }>
        <fieldset>
          <label htmlFor="merchant_name">Merchant Name:</label>
          <input type="text" ref={merchant_name} name="merchant_name" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="account_number">Account Number:</label>
          <input type="text" ref={account_number} name="account_number" required></input>
        </fieldset>
        <fieldset>
          <label htmlFor="exp_date">Expiration Date:</label>
          <input type="date" ref={exp_date} name="exp_date" min={new Date()} required></input>
        </fieldset>
        <button type="submit">Add Payment</button>
      </form>
    </>
  )
}

export default PaymentForm

