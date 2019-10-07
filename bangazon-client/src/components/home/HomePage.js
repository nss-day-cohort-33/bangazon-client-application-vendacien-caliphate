import React, { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ProductList from "../product/ProductList"

const HomePage = props => {
    const [products, setProducts] = useState([])
    // const { isAuthenticated } = useSimpleAuth()

    useEffect(() => {
        fetch('http://localhost:8000/products', {
            "method": "GET",
            "headers": {
                "Accept": "application/json"
                // "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(res => res.json())
        .then(setProducts)
    }, []);



    // const getProducts = () => {
    //     if (isAuthenticated()) {
    //         fetch('http://localhost:8000/products', {
    //             "method": "GET",
    //             "headers": {
    //                 "Accept": "application/json",
    //                 "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(setProducts)
    //     }
    // }



    return (
        <>
            <main className="explorer">
                <ProductList products={products} {...props}/>
            </main>
        </>
    )
}

export default HomePage