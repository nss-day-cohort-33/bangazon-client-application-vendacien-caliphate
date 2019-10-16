import React, { useEffect, useState } from "react";
import ProductList from "../product/ProductList";

// // """
// //    Author: Drew Palazola
//      This is the home page "bangazon", this gets all products and proceeds to list them out.
// // """

const HomePage = props => {
  return (
    <>
      <main className="explorer">

        <h4><ProductList {...props} /></h4>

      </main>
    </>
  );
};

export default HomePage;
