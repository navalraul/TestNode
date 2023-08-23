// import { createContext, useEffect, useReducer } from "react"


// const initialState = { currentuser: null, token: null }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "LOGIN":
//             return {
//                 ...state,
//                 currentuser: action.payload,
//                 token: action.token,
//             };
//         case "LOGOUT":
//             return {
//                 currentuser: null,
//                 token: null,
//             };
//         default:
//             return state;
//     }
// };


// export const MyUserContext = createContext();

// const MyContext = ({ children }) => {

//     const [state, dispatch] = useReducer(reducer, initialState);

//     // console.log("userDetails - ", state.currentuser, "token - ", state?.token);

//     const login = (token, userData) => {
//         localStorage.setItem("userToken", JSON.stringify(token));
//         localStorage.setItem("userData", JSON.stringify(userData));
//         dispatch({
//             type: "LOGIN",
//             payload: userData,
//             token: token,
//         });
//     };
//     const logout = () => {
//         localStorage.removeItem("userToken");
//         localStorage.removeItem("userData");
//         dispatch({
//             type: "LOGOUT",
//         });
//     };

//     useEffect(() => {
//         const getToken = JSON.parse(localStorage.getItem("userToken"));
//         const userData = JSON.parse(localStorage.getItem("userData"));
//         dispatch({
//             type: "LOGIN",
//             token: getToken,
//             payload: userData,
//         });
//     }, []);

//     return (
//         <MyUserContext.Provider value={{ login, logout, state }} >
//             {children}
//         </MyUserContext.Provider>
//     )

// }

// export default MyContext;