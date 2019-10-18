import React from "react"
import { Link } from 'react-router-dom'

const Product = props => {
  const totalAvailable = props.product.quantity - props.product.total_sold
    return (
        <>


            <div className="card-body">
              <section className="product">
                  <Link className="nav-link" to={`/products/${props.product.id}`}>
                      <h5>{props.product.name}</h5>
                  </Link>
              </section>
              <p className="card-text">${props.product.price}</p>
              <p className="card-text">Current Inventory: <b>{totalAvailable}</b> available</p>
            </div>

        </>
    )
}

export default Product