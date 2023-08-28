// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext } from './components/Context/AuthContext';
import Navbar from './components/Common/Navbar';
import AddProduct from './components/Seller/AddProduct';
import YourProducts from './components/Seller/YourProducts';
import Profile from './components/Profile';

function App() {

  const { state } = useContext(AuthContext)
  console.log(state?.user, "user")

  return (

    <div className="App">
      <Navbar/>
      <Routes >
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/add-product' element={<AddProduct />} />
        <Route exact path='/your-products' element={<YourProducts />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
