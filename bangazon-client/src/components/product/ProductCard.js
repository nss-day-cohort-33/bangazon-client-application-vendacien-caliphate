import React from "react"
import { Link } from 'react-router-dom'

const Product = props => {
  const totalAvailable = props.product.quantity - props.product.total_sold
    return (
        <>

          <div className={`card product-${props.product.id}`} style={{width: "18rem"}}>
            <div className="card-body">
              <section className="product">
                  <Link className="nav-link" to={`/products/${props.product.id}`}>
                      <h5>{props.product.name}</h5>
                  </Link>
              </section>
              <p className="card-text">${props.product.price}</p>
              <p className="card-text">Current Inventory: <b>{totalAvailable}</b> available</p>
              <p className="card-text">Number Sold: <b>{props.product.total_sold}</b></p>
            </div>
          </div>

        </>
    )
}

export default Product