import React, { useEffect, useState, useRef } from "react";
import ProductList from "../product/ProductList";

// // """
// //    Author: Drew Palazola
//      This is the home page "bangazon", this gets all products and proceeds to list them out.
// // """

const HomePage = props => {
  const [products, setProducts] = useState([]);
  const search = useRef()
  console.log("search", search)


  const getTwentyProducts = () => {
    fetch("http://localhost:8000/products", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setProducts);
  }


  const filterProductsCity = (city) => {
    fetch(`http://localhost:8000/products?city=${city}`, {
      method: "Get",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setProducts)
  }
  useEffect(getTwentyProducts, [])
  useEffect(() => filterProductsCity, [])

  const SubmitSearch = e => {
    e.preventDefault()
    console.log("it works")
    filterProductsCity(search.current.value)
  }

  return (
    <>
      <main className="explorer">
        <label name="city">Search for a City</label>
        <br></br>
        <form onSubmit={SubmitSearch}>
          <input placeholder="ex: Nashville" autoFocus name="city" defaultValue="" ref={search} type="text">
          </input>

        </form>


        <h4><ProductList {...props} /></h4>

      </main>
    </>
  );
};

export default HomePage;
