import React from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// // """
// //    Author: Drew Palazola and Jake Scott
//
// // """

const Payment = props => {

    const { isAuthenticated } = useSimpleAuth()

    const deleteItem = (paymentItem) => {
        if (isAuthenticated())
        fetch(`http://localhost:8000/paymenttypes/${paymentItem}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
          }
        })
          .then(() => {
              props.history.push("/mysettings")
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
