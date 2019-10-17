import React from "react"
import Product from "./Product"

// // """
// //    Author: Drew Palazola
//      lists the products on the homepage, only lists the latest 20 products entered
// // """


const ProductList = props => {
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
