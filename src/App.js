import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'
//import AboutUs from './components/AboutUs'
//import ImageCard from './components/ImageCard'
import Layoutak from "./pages/Layoutak";
import Gardenlanding from "./pages/Gardenlanding";
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import About from './pages/About'
// import ImageCard from './components/ImageCard'
import Login from './components/Login'
import Signup from "./components/Signup";
import API from './utils/API';

function App() {
  const [user, setUser] = useState({
  id: 0,
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
				res.json().then(data => {
					setToken(storedToken);
					setUser({
						id: data.id,
						email: data.email
					});
				});
			}
		});
	}
}, [])

  const submitLoginHandle = (username, email, password) => {
    API.login(username, email, password).then(res => {
      if (!res.ok) {
        setUser({ id: 0, username: "", email: "" });
        setToken("")
      }
      return res.json()
    }).then(data => {
      if (data?.profile) {
        setUser({
          id: data.profile._id,
          username: data.profile.username,
          email: data.profile.email
        })
        setToken(data.token)
        localStorage.setItem('token', data.token)
      }
      return data;
    })
  }

  const submitSignupHandle = (username, email, password) => {
    API.signup(username, email, password).then(res => {
      if (!res.ok) {
        setUser({ id: 0, username: "", email: "" });
        setToken("")
      }
      return res.json()
    }).then(data => {
      if (data?.profile) {
        setUser({
          id: data.profile._id,
          username: data.profile.username,
          email: data.profile.email
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
            <Route path='/login' element={<Login handleLogin={submitLoginHandle} />} />
			<Route path="/signup" element={<Signup handleSignup={submitSignupHandle} /> }/>
            <Route path='/layout' element={<Layoutak/>}/> 
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/settings' element={<Settings/>}/>
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
