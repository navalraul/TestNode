import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'


const Home = () => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const getYourProducts = async () => {

            const response = await axios.get("http://localhost:8000/all-products")

            if (response.data.success) {
                setAllProducts(response.data.products);
            }
        };
        getYourProducts();
    }, [])


    return (

        <div id='home-screen'>
            <div id='home'>
                <h2>Home</h2>
                <div id="products">
                    {allProducts?.length ? (
                        allProducts.map((product) => (
                            <div className="product">
                                <div className="image">
                                    <img src={product.image} alt="product" />
                                </div>
                                <div className="details">
                                    <h2>{product.name}</h2>
                                    <h3>₹{product.price}</h3>
                                    <p>{product.category}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2>No Products Found!</h2>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
