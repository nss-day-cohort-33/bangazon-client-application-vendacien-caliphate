import React from "react"

const Product = props => {

    return (
        <>
            <section className="product">
                    {props.product.name}
            </section>
        </>
    )
}

export default Product
