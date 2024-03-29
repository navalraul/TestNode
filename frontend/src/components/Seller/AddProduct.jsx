
import React, { useState } from 'react';
import SellerProtected from "../Common/SellerProtected"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
    const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "" })

    const router = useNavigate();

    const handleChange = (event) => {
        setProductData({...productData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(productData.name && productData.price && productData.image && productData.category) {
            const token = JSON.parse(localStorage.getItem("Token"))
            try{
                const response = await axios.post("http://localhost:8000/add-product", { token, productData })
                if(response.data.success) {
                    setProductData({ name: "", price: "", image: "", category: "" })
                    router('/your-products')
                    toast.success(response.data.message)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            toast.error("All fields are mandatory")
        }
    }


  return (
    <SellerProtected>
      <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input type='text' onChange={handleChange} name='name' value={productData.name} /><br />
                <label>Price</label><br />
                <input type='number' onChange={handleChange} name='price' value={productData.price} /><br />
                <label>Image</label><br />
                <input type='text' onChange={handleChange} name='image' value={productData.image} /><br />
                <label>Category</label><br />
                <input type='text' onChange={handleChange} name='category' value={productData.category} /><br />
                <input type='submit' value='Add Product' /><br />
            </form>
            <button onClick={() => router('/your-products')}>All Products</button>
    </SellerProtected>
  )
}

export default AddProduct
