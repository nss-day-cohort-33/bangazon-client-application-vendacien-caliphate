import React from "react"
import { Link } from "react-router-dom"

const Product = props => {

    return (
        <>
            <section className="product">
            <Link className="nav-link" to={`/products/${props.product.id}`}>{props.product.name}</Link>
            </section>
        </>
    )
}


export default Product
