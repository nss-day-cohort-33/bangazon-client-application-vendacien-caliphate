import React from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// // """
// //    Author: Drew Palazola
//
// // """

const Payment = props => {

    const { isAuthenticated } = useSimpleAuth()

    const deleteItem = (paymentItem) => {
        if (isAuthenticated())
        fetch(`http://localhost:8000/paymenttypes?paymenttype_id=${paymentItem}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
        })
          .then(res => res.json())
          .then(() => {
              props.history.push("/paymentlist")
          })
      }

    return (
        <>
            <section className="payment">
                <h4>{props.payment.merchant_name}</h4>
                <button onClick={() => {deleteItem(props.payment.id)}}>Delete This Payment Option</button>
            </section>
        </>
    )
}


export default Payment
