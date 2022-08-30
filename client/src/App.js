import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} exact />
      </Routes>
      
        <section className="container">
        <Routes>
          <Route path='/register' element={<Register />} exact />
          <Route path='/Login' element={<Login />} exact />
          </Routes>
        </section>
      

    </Fragment>
  </Router>
);


export default App;
