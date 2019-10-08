import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import ProductForm from "./product/ProductForm"
import PaymentForm from "./payment/PaymentForm"


const ApplicationViews = () => {
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
                path="/productform" render={props => {
                    return <ProductForm {...props} />
                }}
            />
            <Route
                path="/paymentform" render={props => {
                    return <PaymentForm {...props} />
                }}
            />



        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)