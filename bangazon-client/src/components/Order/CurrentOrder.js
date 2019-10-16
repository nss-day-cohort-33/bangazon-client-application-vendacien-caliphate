import React, { useState, useEffect } from "react"

const MyCart = props => {
  const [products, setProducts] = useState([])

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/orders/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
    .then(response => {
      console.log('response', response );
      return response.json()
    })
    .then(setProducts)
  }

  useEffect(getOpenOrder, [])
    console.log('Open order', products)
  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>
          {
            products.map(item => {
                    return (<li key={item.id}>{item.name}: {item.price}</li>)
                })

          }
        </ul>
        <button>Add Payment to complete order</button>
      </main>
    </>
  )
}

export default MyCart