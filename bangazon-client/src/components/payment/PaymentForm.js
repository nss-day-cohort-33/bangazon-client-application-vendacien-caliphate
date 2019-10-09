//Author: Jake Scott
//Purpose: Allow a user to fill our a payment form.
//Methods: GET, POST
import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const PaymentForm = props => {
    const merchant_name = useRef();
    const account_number = useRef();
    const exp_date = useRef();
    const created_at = useRef();
    const { isAuthenticated } = useSimpleAuth();

    const createPayment = e => {
        e.preventDefault();
        const created = `${exp_date.current.value}-01`
        if (isAuthenticated()) {
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
                "created_at": created

            })
            })
                .then(response => response.json())
                .then(() => {
                props.history.push("/paymentform")
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
        <input type="date" ref={created_at} name="exp_date" defaultValue={new Date()} hidden></input>
        <button type="submit">Add Payment</button>
      </form>
    </>
  )
}
// .toISOString().slice(0,7)
// .toISOString().slice(0,10)
export default PaymentForm

// import React, { useEffect, useState, useRef } from "react";
// import useModal from "../../hooks/ui/useModal";

// const PaymentForm = props => {
//   const merchant_name = useRef();
//   const account_number = useRef();
//   const exp_date = useRef();
// //   const created_at = useRef();
//   const customer_id = useRef();

//   // Create a state variable for payments - useState()
//   const [paymentList, setPaymentList] = useState([]);
//   const { toggleDialog, modalIsOpen } = useModal("#category_alert");

//   const handleCreate = e => {
//     e.preventDefault();

//     const newPayment = {
//       merchant_name: merchant_name.current.value,
//       account_number: account_number.current.value,
//       exp_date: exp_date.current.value,
//     //   created_at: created_at.current.value,
//       customer_id: localStorage.getItem("customer_id")
//     };
//     // if (customer_id.current.value === "") {
//     //   toggleDialog(true);
//     // } else {
//     //   createPayment(newPayment).then(() => {
//     //     props.history.push({
//     //       pathname: "/mysettings"
//     //     });
//     //   });
//     // }
//   };

//   const getPayments = () => {
//     // Fetch the data from localhost:8000/payments
//     fetch("http://localhost:8000/paymenttypes", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Token ${localStorage.getItem("bangazon_token")}`
//       }
//     })
//       //   Convert to JSON
//       .then(response => response.json())
//       //   Store payment items in state variable
//       .then(allPayments => {
//         setPaymentList(allPayments);
//       });
//   };

//   const createPayment = (newPayment) => {
//     return fetch("http://localhost:8000/paymenttypes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Token ${localStorage.getItem("bangazon_token")}`
//       },
//       body: JSON.stringify(newPayment)
//     }).then(res => res.json());
//   };

//   //   Create useEffect()
//   useEffect(() => {
//     getPayments();
//     createPayment();
//     const handler = e => {
//       if (e.keyCode === 27) {
//         if (modalIsOpen) {
//           toggleDialog(false);
//         }
//       }
//     };

//     window.addEventListener("keyup", handler);

//     return () => window.removeEventListener("keyup", handler);
//   }, []);

//   // Create HTML representation with JSX
//   return (
//     <>
//       {/* Dialog Box */}
//       <dialog id="category_alert" className="category_alert">
//         <br />
//         <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
//         <p>Please Select a Payment.</p>
//         <button onClick={() => toggleDialog(false)}>Ok</button>
//         </div>
//         <button
//           style={{
//             position: "absolute",
//             top: "0.25em",
//             right: "0.25em"
//           }}
//           id="closeBtn"
//           onClick={() => toggleDialog(false)}
//         >
//           X
//         </button>
//       </dialog>
//       {/* Add Product Form */}
//       <main style={{ textAlign: "center" }}>
//         <form className="form--login" onSubmit={handleCreate}>
//           <h1 className="h3 mb-3 font-weight-normal">Create a New Payment</h1>
//           <fieldset>
//             <label htmlFor="merchant_name"> Merchant Name </label>
//             <input
//               ref={merchant_name}
//               type="text"
//               name="merchant_name"
//               className="form-control"
//               placeholder="Merchant Name"
//               required
//               autoFocus
//             />
//           </fieldset>
//           <fieldset>
//             <label htmlFor="account_number"> Account Number </label>
//             <br />
//             <input
//               ref={account_number}
//               placeholder="Account Number"
//             ></input>

//           </fieldset>
//           <fieldset>
//             <label htmlFor="exp_date"> Expiration Date </label>
//             <input
//               ref={exp_date}
//               type="date"
//               name="exp_date"
//               className="form-control"
//               placeholder="Expiration Date"
//               required
//             />
//           </fieldset>
//           {/* <fieldset>
//             <label htmlFor="payment"> Payment: </label>
//             <select ref={payment_id}>
//               <option value="">Select Payment</option>
//               {paymentList.map(payment => {
//                 return <option value={payment.id}>{payment.name}</option>;
//               })}
//             </select>
//           </fieldset> */}
//           <fieldset>
//             <button type="submit" > Add payment</button>
//           </fieldset>
//         </form>
//       </main>
//     </>
//   );
// };

// export default PaymentForm;