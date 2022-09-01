import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'
import AboutUs from './components/AboutUs'
//import ImageCard from './components/ImageCard'
import Layout from "./pages/Layout";
import Gardenlanding from "./pages/Gardenlanding";

// const classes = {
//   root: {
//       minHeight: '100vh',
//       backgroundImage: 'none',
//       backgroundRepeate: 'no-repeat',
//       backgroundSize: 'cover'
//   }
// }

const App = () => (
  <Router>
      <NavBar />
      <AboutUs />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/layout' element={<Layout/>}/>
        <Route path='/Gardenlanding' element={<Gardenlanding/>}/> 
        {/* <Route path='/calendar' element={<Calendar/>}/> */}
        {/* <Route path='/settings' element={<Settings/>}/> */}
        {/* <Route path='/searchmyplants' element:{<SearchMyPlants/>}/> */}
        {/* <Route path='/search' element={<SearchAll/>}/> */}
      </Routes>
    {/* </NavBar> */}
  </Router>
  
)


export default App;
