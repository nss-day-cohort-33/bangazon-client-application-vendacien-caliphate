import React, { useEffect, useState } from "react";
import ProductList from "../product/ProductList";

// // """
// //    Author: Drew Palazola
//      This is the home page "bangazon", this gets all products and proceeds to list them out.
// // """

const HomePage = props => {
  const [products, setProducts] = useState([]);

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


  return (
    <>
      <main className="explorer">

        <h4><ProductList products={products} {...props} /></h4>

      </main>
    </>
  );
};

export default HomePage;
