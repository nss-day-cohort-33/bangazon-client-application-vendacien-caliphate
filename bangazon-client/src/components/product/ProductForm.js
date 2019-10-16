//Author: Karla Gallegos & Jake Scott
//Purpose: Allow a user to fill our a product form and get alerted if they don't select procut category.
//Methods: GET, POST


import React, { useEffect, useState, useRef } from "react";
import useModal from "../../hooks/ui/useModal";

const ProductForm = props => {
  const name = useRef();
  const description = useRef();
  const quantity = useRef();
  const price = useRef();
  const city = useRef();
  const category_id = useRef();

  // Create a state variable for itinerary items - useState()
  const [categoryList, setCategoryList] = useState([]);
  const { toggleDialog, modalIsOpen } = useModal("#category_alert");

  const handleCreate = e => {
    e.preventDefault();

    const newProduct = {
      name: name.current.value,
      price: parseInt(price.current.value),
      description: description.current.value,
      quantity: parseInt(quantity.current.value),
      city: city.current.value,
      producttype_id: parseInt(category_id.current.value),
      customer_id: parseInt(localStorage.getItem("customer_id")),
      product_image: ""
    };
    if (category_id.current.value === "") {
      toggleDialog(true);
    } else {
      createProduct(newProduct).then(() => {
        props.history.push({
          pathname: "/"
        });
      });
    }
  };

  const getCategories = () => {
    // Fetch the data from localhost:8000/categories
    fetch("http://localhost:8000/producttypes", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`
      }
    })
      //   Convert to JSON
      .then(response => response.json())
      //   Store itinerary items in state variable
      .then(categoryList => {
        console.log(categoryList,"CatagoryList")
        setCategoryList(categoryList);
      });
  };

  const createProduct = (newProduct) => {
    return fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(newProduct)
    }).then(res => res.json());
  };

  //   Create useEffect()
  useEffect(() => {
    getCategories();

    const handler = e => {
      if (e.keyCode === 27) {
        console.log(`MyItinerary useEffect() modalIsOpen = ${modalIsOpen}`);
        if (modalIsOpen) {
          toggleDialog(false);
        }
      }
    };

    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, []);



  // Create HTML representation with JSX
  return (
    <>
      {/* Dialog Box */}
      <dialog id="category_alert" className="category_alert">
        <br />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <p>Please Select a Category for the Product.</p>
        <button onClick={() => toggleDialog(false)}>Ok</button>
        </div>
        <button
          style={{
            position: "absolute",
            top: "0.25em",
            right: "0.25em"
          }}
          id="closeBtn"
          onClick={() => toggleDialog(false)}
        >
          X
        </button>
      </dialog>
      {/* Add Product Form */}
      <main style={{ textAlign: "center" }}>
        <form className="form--login" onSubmit={handleCreate}>
          <h1 className="h3 mb-3 font-weight-normal">Create a New Product</h1>
          <fieldset>
            <label htmlFor="name"> Product Name </label>
            <input
              ref={name}
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description"> Description </label>
            <br />
            <textarea
              ref={description}
              placeholder="Product Description"
            ></textarea>

          </fieldset>
          <fieldset>
            <label htmlFor="quantity"> Quantity </label>
            <input
              ref={quantity}
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity Available"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="price"> Price </label>
            <input
              ref={price}
              type="number"
              name="price"
              className="form-control"
              placeholder="Product Price"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="city"> City </label>
            <input
              ref={city}
              type="text"
              name="city"
              className="form-control"
              placeholder="City, State"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="category"> Category: </label>
            <select ref={category_id}>
              <option value="">Select Category</option>
              {categoryList.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>;
              })}
            </select>
          </fieldset>
          <fieldset>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default ProductForm;