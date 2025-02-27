import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import Auth from './components/auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/user/Action'
import ResetPassword from './components/auth/ResetPassword'

function App() {
  const { auth, user } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [auth.jwt])
  return (
    <div>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/*' element={user?.reqUser ? <HomePage /> : <Auth />}></Route>
      </Routes>
    </div>
  )
}

export default App
