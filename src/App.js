import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import About from './pages/About'
// import ImageCard from './components/ImageCard'
import Login from './components/Login'
import API from './utils/API';

function App() {
  const [user, setUser] = useState({
  id: 0,
  email: ''
  })

  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    API.checkToken(storedToken).then(res => {
      if (!res.ok) {
        console.log('invalid token')
        localStorage.removeItem('token')
      }
      else {
        console.log('valid token')
        res.json().then(data => {
          setToken(storedToken)
          setUser({
            id: data.id,
            email: data.email
          })
        })
      }
    })
  }, [])

  const submitLoginHandle = (email, password) => {
    API.login(email, password).then(res => {
      if (!res.ok) {
        setUser({ userId: 0, email: '' });
        setToken('')
        return;
      }
      return res.json()
    }).then(data => {
      console.log(data)
      setUser({
        id: data.user.id,
        email: data.user.email
      })
      setToken(data.token)
      localStorage.setItem('token', data.token)
    })
  }

  const submitSignupHandle = (email, password) => {
    API.signup(email, password).then(res => {
      if (!res.ok) {
        setUser({ userId: 0, email: '' });
        setToken('')
        return;
      }
      return res.json()
    }).then(data => {
      console.log(data)
      setUser({
        id: data.user.id,
        email: data.user.email
      })
      setToken(data.token)
      localStorage.setItem('token', data.token)
    })
  }

  const logoutClick = () => {
    localStorage.removeItem('token');
    setUser({
      id: 0,
      email: ''
    })
    setToken('')
  }
  return (
    <Router>
      {/* userId={userId} is what it should be */}
      <NavBar userId={user.id} logout={logoutClick} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login userId={user.id} handleLogin={submitLoginHandle} handleSignup={submitSignupHandle} />} />
            {/* <Route path='/layouts' element={<Layouts/>}/> */}
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/settings' element={<Settings/>}/>
            {/* <Route path='/searchmyplants' element:{<SearchMyPlants/>}/> */}
            {/* <Route path='/search' element={<SearchAll/>}/> */}
            <Route path='/about' element={<About/>}/>
            <Route path='*' element={<h1>404 page not found</h1>} />
          </Routes>
  </Router>
  );
}

export default App;
