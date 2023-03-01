import './App.css';
// import Login from './components/Login/Login';
import CreateAccount from './components/Admin/CreateAccount/CreateAccount';
import { Routes, Route, Link } from 'react-router-dom';
import ManageAccount from './components/Admin/ManageAccount/ManageAccount';
import Navbar from './components/Navbar/Navbar';
import { Fragment } from 'react';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/manage-account' element={<ManageAccount />} />
      </Routes>
    </>
  )
}

export default App;
