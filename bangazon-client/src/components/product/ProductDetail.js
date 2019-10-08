import React, { useEffect, useState } from "react";

const ProductDetails = props => {
    const [product, setProduct] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:8000/products?product_Id=${props.match.params.productId}`, {
          method: "GET",
          headers: {
            Accept: "application/json"
            // "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
        })
          .then(res => res.json())
          .then(setProduct);
      }, []);



    return (
        <>
            <section className="ProductDetails">

                    {
                        product.filter(product => product.id == props.match.params.productId)
                        .map(product =>
                            <>
                            <div key={product.id}>
                            <h3>Name of Product: {product.name}</h3>
                            <h3>Product Description: {product.description}</h3>
                            <h3>Price: {product.price}</h3>
                            <h3>Quantity Available : {product.quantity}</h3>
                            <button className="fakeLink addToOrder__link"
                                onClick={() => props.getAttractions(props.area.id)}> Add to Order </button>
                            </div>
                            </>
                        )
                    }

            </section>
        </>
    )
}

export default ProductDetails
