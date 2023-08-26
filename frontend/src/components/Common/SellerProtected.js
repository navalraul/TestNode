import { useContext, useEffect } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"



const SellerProdected = ({children}) => {
    const {state} = useContext(AuthContext)
    const router = useNavigate();

    useEffect(()=> {
        if(state?.user?.role !="Seller") {
            router('/')
        }
    },[state])

    return state?.user?.role == "Seller" ? children : null;
}

export default SellerProdected;