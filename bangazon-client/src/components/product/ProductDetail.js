import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// // """
// //    Author: Drew Palazola
//      Displays details for individual products
// // """

const ProductDetails = props => {
    const { isAuthenticated } = useSimpleAuth()
    const [product, setProduct] = useState([]);


    useEffect(() => {
        console.log("parms", +props.match.params.productId)
        fetch(`http://localhost:8000/products?product_Id=${+props.match.params.productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        })
          .then(res => res.json())
          .then(setProduct);
      }, []);

    const addToOrder = (newOrder) => {
            fetch(`http://localhost:8000/orders`, {
                "method": "POST",
                headers :{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
                },
                body: JSON.stringify(newOrder)
            })
                .then(response => response.json())
        }


        console.log("product", product)
    return (
        <>
            <section className="ProductDetails">

                    {
                        product.map(product =>
                            <>
                            <div  key={product.id}>
                            <h3>Name of Product: {product.name}</h3>
                            <h3>Product Description: {product.description}</h3>
                            <h3>Price: ${product.price}</h3>
                            <h3>Quantity Available : {product.quantity}</h3>
                            {isAuthenticated() ?
                            <button className="fakeLink addToOrder__link"
                                onClick={() => addToOrder(product)}> Add to Order </button>
                                : null
                            }
                            </div>
                            </>
                        )
                    }

            </section>
        </>
    )
}

export default ProductDetails
