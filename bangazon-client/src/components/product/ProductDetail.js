import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// // """
// //    Author: Drew Palazola
//      Displays details for individual products
// // """

const ProductDetails = props => {
    const { isAuthenticated } = useSimpleAuth()
    const [productDetail, setProduct] = useState([]);

    const getProduct =()=> {
        fetch(`http://localhost:8000/products/${+props.match.params.productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        })
          .then(res => res.json())
          .then(setProduct);
    }


    useEffect(() => {
        getProduct()
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


        console.log("product", productDetail)
    return (
        <>
            <section className="ProductDetails">
                            <>
                            <div  key={productDetail.id}>
                            <h3>Name of Product: {productDetail.name}</h3>
                            <h3>Product Description: {productDetail.description}</h3>
                            <h3>Price: ${productDetail.price}</h3>
                            <h3>Quantity Available : {productDetail.quantity}</h3>
                            {isAuthenticated() ?
                            <button className="fakeLink addToOrder__link"
                                onClick={() => addToOrder(productDetail)}> Add to Order </button>
                                : null
                            }
                            </div>
                            </>
            </section>
        </>
    )
}

export default ProductDetails
