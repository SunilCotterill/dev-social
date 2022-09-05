import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

//Redux stuff
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() =>{
    store.dispatch(loadUser());
  }, []);
  return(
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} exact />
      </Routes>
      
        <section className="container">
          <Alert />
        <Routes>
          <Route path='/register' element={<Register />} exact />
          <Route path='/Login' element={<Login />} exact />
          </Routes>
        </section>
      

    </Fragment>
  </Router>
  </Provider>
)};


export default App;
