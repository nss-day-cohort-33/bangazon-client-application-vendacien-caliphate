import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import ProductCategories from "./product/ProductCategories"
import ProductCategory  from "./product/ProductCategory"
import ProductDetail from "./product/ProductDetail"
import ProductForm from "./product/ProductForm"
import PaymentForm from "./payment/PaymentForm"
import Profile from "./payment/Profile"
import ProductCategoryList from "./product/ProdCatList"
import PaymentOptions from "./payment/PaymentOptions"
import MyProducts from "./product/MyProduct"


const ApplicationViews = () => {
    const [categories, setCategories] = useState([])


    const getCategories = () => {
            fetch(`http://localhost:8000/producttypes`, {
                "method": "GET",
                headers :{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
                }
            })
                .then(response => response.json())
                .then(setCategories)
    }


    useEffect(() => {
        getCategories()
    }, [])


    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route
                exact path="/types" render={props => {
                    return (
                       <ProductCategories {...props} />
                    )
                }}
            />

            <Route exact path="/types/:categoryId(\d+)" render={(props) => {
                const categoryId = +props.match.params.categoryId
                console.log("categoryId",+props.match.params.categoryId)
                // console.log("params",props.match.params.categoryId, categories )
                // let category = categories.find(category =>
                // category.id === +props.match.params.categoryId
                // )
                // console.log(category)
                // if (!category) {
                //     category = {id:404, name:"Category Not Found." }
                // }
                return <ProductCategoryList {...props} category={ categories } categoryId={categoryId} />
                }}
            />

            <Route exact path="/products/:productId(\d+)" render={(props) => {
                return <ProductDetail {...props} />
            }}

            />
            <Route
                path="/productform" render={props => {
                    return <ProductForm {...props} />
                }}
            />
            <Route
                path="/paymentform" render={props => {
                    return <PaymentForm {...props} />
                }}
            />

            <Route exact path="/mysettings" render={props => {
                return <Profile {...props} />
            }}
            />

            <Route exact path="/paymentlist" render={props => {
                return <PaymentOptions {...props} />
            }}
            />
            <Route exact path="/MyProducts" render={props => {
                return <MyProducts {...props} />
            }}
            />




        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)

// {...props} category={ category }