import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import ProductList from "./product/ProductList"
import ProductCategories from "./product/ProductCategories"
import ProductCategory  from "./product/ProductCategory"


const ApplicationViews = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const { isAuthenticated } = useSimpleAuth()

    const getProducts = () => {
        if (isAuthenticated()) {
              fetch(`http://localhost:8000/products`, {
                  "method": "GET",
                  "headers": {
                      "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                  }
              })
                  .then(response => response.json())
                  .then(setProducts)
          }
      }
  
      const getCategories = () => {
              if (isAuthenticated()) {
              fetch(`http://localhost:8000/productcategories`, {
                  "method": "GET",
                  "headers": {
                      "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
                  }
              })
                  .then(response => response.json())
                  .then(setCategories)
          }
      }
  
      useEffect(() => {
          getProducts()
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
                exact path="/productcategories" render={props => {
                    return (
                       <ProductCategories categories={categories} />
                    )
                }}
            />

            <Route exact path="/productcategories/:categoryId(\d+)" render={(props) => {
                let category = categories.find(category =>
                category.id === +props.match.params.categoryId
                )
                if (!category) {
                    category = {id:404, name:"Category Not Found." }
                }
                return <ProductCategory {...props} category={ category } />
                }}
            /> 



        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)