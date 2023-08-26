// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext } from './components/Context/AuthContext';

function App() {

  const { state } = useContext(AuthContext)
  console.log(state?.user, "user")

  return (

    <div className="App">
      <Routes >
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
