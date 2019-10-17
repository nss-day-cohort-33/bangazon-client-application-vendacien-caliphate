import React, { useEffect, useState, useRef } from "react";
import ProductList from "../product/ProductList";

// // """
// //    Author: Drew Palazola
//      This is the home page "bangazon", this gets all products and proceeds to list them out.
// // """

const HomePage = props => {
  const [products, setProducts] = useState([]);
  const search = useRef()


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

  useEffect(() => {
    getTwentyProducts()}, [])

  const SubmitSearch = e => {
    e.preventDefault()
    filterProductsCity(search.current.value)

  }

  const refresh = (e) => {
    e.preventDefault()
    getTwentyProducts()
  }

  return (
    <>
      <main className="explorer">
        <label name="city">Search for a City</label>
        <br></br>
        <form onSubmit={SubmitSearch}>
          <input placeholder="ex: Nashville" name="city" defaultValue="" ref={search} type="text">
          </input>
          <button type='submit'>Submit</button>
        </form>
          <a href="" onClick={refresh}>Reset</a>
        <h4><ProductList {...props} products={products} /></h4>
      </main>
    </>
  );
};

export default HomePage;
