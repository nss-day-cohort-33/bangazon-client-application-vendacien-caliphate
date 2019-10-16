import React, { useEffect, useState } from "react";
import Payment from "./Payment"

// // """
// //    Author: Drew Palazola
//      This is the home page "bangazon", this gets all products and proceeds to list them out.
// // """

const PaymentOptions = props => {
  const [paymenttypes, setPaymenttypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/paymenttypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
      }
    })
      .then(res => res.json())
      .then(setPaymenttypes);
  }, []);


  return (
    <>
      <main className="explorer">

      <section className="product">
                {
                    paymenttypes.map(payment =>
                        <Payment key={payment.id}
                            payment={payment} {...props} />)
                }
      </section>

      </main>
    </>
  );
};

export default PaymentOptions;
