import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";


export const AuthContext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state
    }
}

const HandleAuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const Login = (userData) => {
        localStorage.setItem("Token", JSON.stringify(userData.token))

        dispatch({
            type: "LOGIN",
            payload: userData.user
        })
    }

    const Logout = () => {
        localStorage.removeItem("Token");
        dispatch({
            type: "LOGOUT",
        });
    };


    useEffect(() => {
        const getCurrentUser = async () => {
            const token = JSON.parse(localStorage.getItem("Token")) || "";
            if (token?.length) {
                const response = await axios.post(
                    "http://localhost:8000/get-current-user",
                    { token }
                );

                if (response.data.success) {
                    dispatch({
                        type: "LOGIN",
                        payload: response.data.user,
                    });
                } else {
                    toast.error(response.data.message);
                }
            }
        };

        getCurrentUser();
    }, []);
    // useEffect(() => {
    //     async function getCurrentUserData() {
    //         var token = JSON.parse(localStorage.getItem("token"));
    //         try{
    //             const response = await axios.post("http://localhost:8000/get-current-user", { token });
    //         if (response.data.success) {
    //             dispatch({
    //                 type: "LOGIN",
    //                 payload: response.data.user
    //             })
    //         } else {
    //             dispatch({
    //                 type: "LOGOUT"
    //             });
    //         }
    //         } catch (error) {

    //         }
    //     }
    //     getCurrentUserData();
    // }, [])

    return (
        <AuthContext.Provider value={{ state, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default HandleAuthContext; 