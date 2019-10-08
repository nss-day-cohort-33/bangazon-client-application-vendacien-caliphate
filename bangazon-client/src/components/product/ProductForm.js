import React, { useEffect, useState, useRef } from "react"
// import ProductFormDialog from "./ProductFormDialog"
import useModal from "../../hooks/ui/useModal"
// import "./MyItinerary.css"


const MyProductForm = props => {
    // Create a state variable for product- useState()
    const [productList, setProductFormList] = useState([])
    const { toggleDialog, modalIsOpen } = useModal("#dialog--itinerary")
    const [currentProduct, setCurrentProduct] = useState({})

    const getItems = () => {
        // Fetch the data from localhost:8000/productform
        fetch("http://localhost:8000/productform", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store product items in state variable
            .then((allTheItems) => {
                setProductFormList(allTheItems)
            })
    }

    const deleteItem = item => {
        fetch(`http://localhost:8000/productform/${item.id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(getItems)
    }

    // Create useEffect()
    useEffect(() => {
        getItems()

        const handler = e => {
            if (e.keyCode === 27) {
                // console.log(`MyItinerary useEffect() modalIsOpen = ${modalIsOpen}`)
                if (modalIsOpen) {
                    toggleDialog(false)
                }
            }
        }

        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [])

    const updateItineraryItem = (starttime) => {
        fetch(`http://localhost:8000/productform/${currentProduct.id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "starttime": starttime
            })
        })
            .then(() => {
                console.log("Updated!!!! YAY!!!!  🙌🏼")
                toggleDialog(false)
            })
            .then(getItems)
    }


    // Create HTML representation with JSX
    return (
        <>
            <ProductFormDialog toggleDialog={toggleDialog} callback={(starttime)=> {
                updateItineraryItem(starttime)
            }} />
            <h2>Product Form</h2>
                <div className="itineraryItems">
                {
                    productList.map((item) => {
                        return <div>
                            {item.product.name} 
                            <button onClick={() => {
                                deleteItem(item)
                            }}>Delete Me</button>
                            <button onClick={() => {
                                setCurrentProduct(item)
                                toggleDialog(true)
                            }}>Edit Me</button>
                        </div>
                    })
                }
                </div>
        </>
    )
}

export default MyProductForm

