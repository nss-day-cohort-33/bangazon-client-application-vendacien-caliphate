import React from "react"
import { useEffect, useState } from "react"
import ProductCategory from "./ProductCategory"

// Created By: Alex Rumsey
// Gets categories, then maps over them.

const ProductCategories = props => {
    const [categories, setCategories] = useState([])


    const getCategories = () => {
            fetch(`http://localhost:8000/producttypes`, {
                "method": "GET",
                headers :{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
                .then(response => response.json())
                .then(setCategories)
    }


    useEffect(() => {
        getCategories()
    }, [])



    return (
        <>
            <article className="categoryList">
                {
                    categories.map(category =>
                        <ProductCategory key={category.id} category={category} />
                    )
                }
            </article>
        </>
    )
}

export default ProductCategories