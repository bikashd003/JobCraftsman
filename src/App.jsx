import React from 'react'
import './App.css'
import Login from './Components/Login/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import JobDescription from './Components/JobDescription/JobDescription';
import Viewjob from './Components/ViewJob/Viewjob';
import Home from './Components/HomePage/Home';


const App = () => {
  return (
    <>
    <Router>
      <div id="App">
        <Routes>
          <Route
            exact path="/"
            element={<Home/>}
          />
          <Route
            exact path="/login"
            element={<Login />}
          />
          <Route
            exact path="/register"
            element={<Register/>}
          />
          <Route
            exact path="/update-job/:jobId"
            element={<JobDescription/>}
          />
          <Route
            exact path="/add-job"
            element={<JobDescription/>}
          />
          <Route
            exact path="/view-job/:jobId"
            element={<Viewjob/>}
          />
          
        </Routes>

      </div>
    </Router>
    </>
  )
}

export default App