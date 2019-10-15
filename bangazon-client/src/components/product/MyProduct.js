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
                        <p>
                        <ProductCard product={product} /> <button onClick={() => {deleteMyProduct(product.id)}}>Delete</button> </p>
                        )
                    }
            </section>
        </>
    )
}


export default MyProducts