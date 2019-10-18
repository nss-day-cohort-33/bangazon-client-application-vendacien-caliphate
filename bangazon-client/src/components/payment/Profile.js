import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Profile = props => {
    const [currentCustomer, setCurrentCustomer] = useState({ user: {} })

    const getCurrentCustomer = () => {
        fetch(`http://localhost:8000/customers/currentCustomer`, {
            method: "GET",
            headers :{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`,
            }
        })
            .then(response => response.json())
            .then((currentCustomer) => setCurrentCustomer(currentCustomer))
    }

    useEffect(getCurrentCustomer, [])
    console.log(currentCustomer)
    return (
        <>
            <section className="product">
                <h3>My Info</h3>
                <p>Name: {currentCustomer.user.first_name} {currentCustomer.user.last_name}</p>
                <p>Address: {currentCustomer.address}</p>
                <p>Phone Number: {currentCustomer.phone_number}</p>
                <p>Username: {currentCustomer.user.username}</p>
                <Link className="nav-link" to={`./PaymentForm`}>
                    <h5>Add a Payment</h5>
                </Link>
                <Link className="nav-link" to={`./paymentlist`}>
                    <h5>Payment Options</h5>
                </Link>
            </section>
        </>
    )
}

export default Profile