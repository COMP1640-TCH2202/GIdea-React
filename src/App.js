import './App.css';
// import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import CreateAccount from './components/Admin/CreateAccount/CreateAccount';
import ManageAccount from './components/Admin/ManageAccount/ManageAccount';
import AccountDetail from './components/Admin/AccountDetail/AccountDetail';
import SetClosureDate from './components/Admin/SetClosureDate/SetClosureDate';
import MainPage from './components/MainPage/MainPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/manage-account' element={<ManageAccount />} />
        <Route path='/create-account' element={<CreateAccount/>} />
        <Route path='/detail/:id' element={<AccountDetail/>} />
        <Route path='/set-date' element={<SetClosureDate/>} />
      </Routes>
    </>
  )
}

export default App;
