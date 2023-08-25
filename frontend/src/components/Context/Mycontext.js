import { createContext, useEffect, useReducer } from "react"
import axios from "axios";

export const MyUserContext = createContext();

const initialState = { user: null }

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state,user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
        default:
            return state
    }
}

const MyContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=> {
        async function getCurrentUserData(){
            var token = JSON.parse(localStorage.getItem("token"))
            const response = await axios.post("http://localhost:8001/get-current-user", { token })
            if(response.data.success) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.user
                })
            } else {
                dispatch({
                    type: "LOGOUT"
                })
            }
        }
        getCurrentUserData();
    },[])
  

    return (
        <MyUserContext.Provider value={{ state, dispatch }} >
            {children}
        </MyUserContext.Provider>
    )

}

export default MyContext;