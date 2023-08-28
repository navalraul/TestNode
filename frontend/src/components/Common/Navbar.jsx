
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

    const { state, Login, Logout } = useContext(AuthContext)
    const router = useNavigate()

    return (
        <div id='navbar'>
            <div id='logo'>
                <h2 onClick={() => router('/')}>Awdiz</h2>
            </div>
            <div id='nav-items'>
                {state?.user?.role != "Seller" && (
                    <>
                        <h4>Mens</h4>
                        <h4>Womens</h4>
                        <h4>Kids</h4>
                    </>
                )}

                {state?.user?.role == "Seller" && (
                    <>
                        <h4 onClick={() => router("/add-product")}>Add Product</h4>
                        <h4 onClick={() => router("/your-products")}>Your Products</h4>
                    </>
                )}
            </div>
            <div id='nav-right'>
                {state?.user?.name? (
                    <>
                        <p>
                            {state?.user?.name?.toUpperCase()}({state?.user?.role})
                        </p>
                        <h4 onClick={() => router('/profile')}>Profile</h4>
                        {state?.user?.role === "Buyer" && <h4>Cart</h4>}
                        <h4 onClick={Logout}>Logout</h4>
                    </>
                ) : (
                    <h4 onClick={() => router('/login')}>Register/Login</h4>
                )}
            </div>
        </div>
    )
}

export default Navbar;
