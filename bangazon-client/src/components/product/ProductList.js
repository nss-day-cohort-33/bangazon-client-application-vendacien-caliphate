import React, { useEffect, useState } from "react"
import Product from "./Product"

// // """
// //    Author: Drew Palazola
//      lists the products on the homepage, only lists the latest 20 products entered
// // """


const ProductList = props => {
    // const [products, setProducts] = useState([])

    // const getProducts = () => {
    //         fetch(`http://localhost:8000/products`, {
    //             "method": "GET",
    //             headers :{
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //                 // "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(setProducts)
    //     }


    // useEffect(() => {
    //     getProducts()
    // }, [])

    return (
        <>
                <ol>
            <article className="productList">
                {
                    props.products.slice(-20).map(product =>
                        <Product key={product.id}
                            product={product} {...props} />)
                }
            </article>
                </ol>
        </>
    )
}

export default ProductList
