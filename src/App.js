import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'

import About from './pages/About'
import Layout from "./pages/Layout";
import Gardenlanding from "./pages/Gardenlanding";
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import API from './utils/API';

function App() {
  const [user, setUser] = useState({
  id: 0,
  username: "",
  email: ''
  })


const [token, setToken] = useState('')

useEffect(() => {
	const storedToken = localStorage.getItem("token");

	if (storedToken) {
		API.checkToken(storedToken).then(res => {
			if (!res.ok) {
				console.warn("Expired token.");
				localStorage.removeItem("token");
			} else {
				return res.json().then(data => {
					setToken(storedToken);
					setUser({
						id: data.id,
						username: data.username,
						email: data.email
					});
				});
			}
		});
	}
}, [])

  const submitLoginHandle = (username, email, password) => {
    return API.login(username, email, password).then(res => {
      if (!res.ok) {
        setUser({ id: 0, username: "", email: "" });
        setToken("")
      }
      return res.json()
    }).then(data => {
      if (data?.user) {
        setUser({
          id: data.user._id,
          username: data.user.username,
          email: data.user.email
        })
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
      return data;
    })
  }

  const submitSignupHandle = (username, email, password) => {
    return API.signup(username, email, password).then(res => {
      if (!res.ok) {
        setUser({ id: 0, username: "", email: "" });
        setToken("")
      }
      return res.json()
    }).then(data => {
      if (data?.user) {
        setUser({
          id: data.user._id,
          username: data.user.username,
          email: data.user.email
        })
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
      return data;
    })
  }

  const logoutClick = () => {
    localStorage.removeItem('token');
    setUser({
      id: 0,
	  username: "",
      email: ''
    })
    setToken('')
	window.location.replace("/");
  }
  return (
    <Router>
      <NavBar user={user} logout={logoutClick} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login handleLogin={submitLoginHandle} />} />
			<Route path="/signup" element={<Signup handleSignup={submitSignupHandle} /> }/>
            <Route path='/layout/' element={<Layout user={user}/>}/>
            <Route path='/calendar' element={<Calendar user={user}/>}/>
            <Route path='/settings' element={<Settings user={user} setUser={setUser}/>}/>
            <Route path='/Gardenlanding' element={<Gardenlanding/>}/>
            {/* <Route path='/searchmyplants' element:{<SearchMyPlants/>}/> */}
            {/* <Route path='/search' element={<SearchAll/>}/> */}
            <Route path='/about' element={<About/>}/>
            <Route path='*' element={<h1>404 page not found</h1>} />
          </Routes>
  </Router>
  );
}


export default App;
