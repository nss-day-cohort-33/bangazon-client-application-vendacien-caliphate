import React, { useState, useEffect } from "react";

const MyCart = props => {
  const [products, setProducts] = useState([]);

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
        console.log("response", response);
        return response.json();
      })
      .then(setProducts);
    console.log("setting", products);
  };

  const deleteItem = productItem => {
    fetch(`http://localhost:8000/orders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify({
        product_id: productItem
      })
    }).then(() => {
      getOpenOrder()
    });
  };

  useEffect(getOpenOrder, []);
  console.log("Open order", products);

  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>
          {products.map(item => {
            return (
              <li key={item.id} id={item.id}>
                {item.name}: {item.price}
                <button
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
        <button>Add Payment to complete order</button>
      </main>
    </>
  );
};

export default MyCart;
