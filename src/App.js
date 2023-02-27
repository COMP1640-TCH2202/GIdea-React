import './App.css';
import Login from './components/Login';
import MainPage from './components/Admin/MainPage/MainPage';
import { Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
  <div>
    <Link to='/login'>Login</Link>
     <br/>
    <Link to='/admin'>MainPage</Link>

    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<MainPage />} />
    </Routes>
  </div>
  )
}

export default App;
