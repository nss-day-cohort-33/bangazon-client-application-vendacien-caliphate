import React, { useState, useEffect, useRef } from "react";

const MyCart = props => {
  const [products, setProducts] = useState([]);
  const [paymenttypes, setPaymentTypes] = useState([]);
  const payment = useRef();

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/orders/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(setProducts);
  };

  const getPaymentTypes = () => {
    fetch(
      `http://localhost:8000/paymenttypes?customer_id=${localStorage.getItem(
        "customer_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(setPaymentTypes);
  };

  const completeOrder = () => {
    fetch(`http://localhost:8000/orders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify({
        "payment_id": payment.current.value
      })
    })
    .then(() => {
      props.history.push("/")
    })
  };

  useEffect(() => {
    getOpenOrder();
    getPaymentTypes();
  }, []);

  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>
          {products.map(item => {
            return (
              <li key={item.id}>
                {item.name}: {item.price}
              </li>
            );
          })}
        </ul>
        <label htmlFor="paymenttypes"> Select a Payment: </label>
        <select ref={payment}>
          <option value="" >
            Select a payment type...
          </option>
          {paymenttypes.map(payment => (
            <option key={payment.id} value={payment.id}>
              {payment.merchant_name}
            </option>
          ))}
        </select>
        <button
          className="fakeLink addToOrder__link"
          onClick={() => completeOrder()}
        >
          {" "}
          Complete Order{" "}
        </button>
      </main>
    </>
  );
};

export default MyCart;
