import React, { useEffect, useState } from "react";

// // """
// //    Author: Drew Palazola
//      Creates the individual product name that is a hyperlink to its details.
// // """

const MyProducts = props => {
    const [myProducts, setMyProducts] = useState([])

    const getMyProducts = () => {
            fetch(`http://localhost:8000/products?customer=${+localStorage.getItem("customer_id")}`, {
                "method": "GET",
                Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
            })
                .then(response => response.json())
                .then(setMyProducts)
    }

    useEffect(getMyProducts, [])

    console.log("id", +localStorage.getItem("customer_id"))
    return (
        <>
            <section className="product">
           <h1>My Products</h1>
           {
                      myProducts.map(product =>
                            <p>{product.name} <button>Delete</button> </p>
                        )
                    }
            </section>
        </>
    )
}


export default MyProducts