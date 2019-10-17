import React, { useEffect, useState } from "react"
import Product from "./ProductCard"
import "./ProductCategory.css"

// Created By: Alex Rumsey
// Gets products by category ID, then displays products in the DOM by category.

const ProductCategoryList = props => {
    const [products, setProducts] = useState([])

    const getProducts = () => {
        fetch(`http://localhost:8000/products?category=${props.categoryId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
            }
        })
            .then(response => response.json())
            .then(setProducts)
    }

    useEffect(getProducts, [])

    return (
        <>
        {props.category.filter(cat => cat.id === props.categoryId).map(cat =>

            products.length > 0 ?
              <article className="categoryList">
                <h3>{cat.name}</h3>
                <div className={`productDiv category-${props.category.id}`}>
                  {
                      products.map(product =>
                        <Product key={product.id} product={product} />
                        )
                    }
                </div>
            </article>
            :
            ""
        )}
        </>
    )
}

export default ProductCategoryList