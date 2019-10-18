import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"

// // """
// //    Author: Krystal Gates
//      Creates the individual product name for MyProducts that is a hyperlink to its details.
// // """

const MyProducts = props => {
    const [myProducts, setMyProducts] = useState([])

    const getMyProducts = () => {
            fetch(`http://localhost:8000/products/myproduct`, {
                method: "GET",
                headers :{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
                }
            })
                .then(response => response.json())
                .then((product) => setMyProducts(product))
    }

    const deleteMyProduct = (productId) => {
        fetch(`http://localhost:8000/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
        })
          .then(() => {
              getMyProducts()
          })
      }

    useEffect(getMyProducts, [])

    return (
        <>
            <section className="product">
           <h1>My Products</h1>
           {
                      myProducts.map(product =>
                        <div className={`card product-${product.id}`} style={{width: "18rem"}}>
                        <ProductCard product={product} />  <p className="card-text">Number Sold: <b>{product.total_sold}</b></p><button onClick={() => {deleteMyProduct(product.id)}}>Delete</button></div>
                        )
                    }
            </section>
        </>
    )
}


export default MyProducts