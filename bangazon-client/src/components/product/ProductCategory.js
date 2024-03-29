import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Product from "./ProductCard"
import "./ProductCategory.css"

// Created By: Alex Rumsey
// Gets products by category ID, then displays products in the DOM by category in lists of three.

const ProductCategory = props => {
    const [products, setProducts] = useState([])

    const getProducts = () => {
            fetch(`http://localhost:8000/products?category=${props.category.id}`, {
                "method": "GET",
                headers :{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
                .then(response => response.json())
                .then(setProducts)
    }

    useEffect(getProducts, [])

    return (
        <>
            { products.length > 0 ?
              <article className="categoryList">
                <Link className="nav-link" to={`/types/${props.category.id}`}>
                <h3>{props.category.name}({products.length})</h3>
                </Link>
                <div className={`productDiv category-${props.category.id}`}>
                  {
                      products.slice(0, 3).map(product =>
                    <div className={`card product-${product.id}`} style={{width: "18rem"}}>
                        <Product key={product.id} product={product} />
                        </div>
                        )
                    }
                </div>
            </article>
            :
            ""
            }
        </>
    )
}

export default ProductCategory