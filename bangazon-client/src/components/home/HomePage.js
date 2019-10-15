import React, { useEffect, useState, useRef } from "react";
import ProductList from "../product/ProductList";

// // """
// //    Author: Drew Palazola
//      This is the home page "bangazon", this gets all products and proceeds to list them out.
// // """

const HomePage = props => {
  const [products, setProducts] = useState([]);
  const search = useRef()

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const SubmitSearch = e => {
    e.preventDefault()
    console.log("it works")
  }

  return (
    <>
      <main className="explorer">
        <label name="city">Search for a City</label>
        <br></br>
        <form onSubmit={SubmitSearch}>
          <input placeholder="ex: Nashville" autoFocus name="city" ref={search} type="text">
          </input>

        </form>


        <h4><ProductList products={products} {...props} /></h4>

      </main>
    </>
  );
};

export default HomePage;
