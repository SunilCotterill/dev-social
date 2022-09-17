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

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';


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
            <Route path='/login' element={<Login />} exact />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} exact />
            <Route path='/create-profile' element={<PrivateRoute><CreateProfile /></PrivateRoute>} exact />
            <Route path='/edit-profile' element={<PrivateRoute><EditProfile /></PrivateRoute>} exact />
            <Route path='/add-experience' element={<PrivateRoute><AddExperience /></PrivateRoute>} exact />
            <Route path='/add-education' element={<PrivateRoute><AddEducation /></PrivateRoute>} exact />
          </Routes>
        </section>
      

    </Fragment>
  </Router>
  </Provider>
)};


export default App;
