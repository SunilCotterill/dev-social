import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';
import { Fragment } from 'react';

const PrivateRoute = ({ component: Component, auth: {isAuthenticated, loading},children, ...rest}) =>{
        // return (  
        // <Route {...rest} render = {props => !isAuthenticated && !loading ? 
        //             (<Navigate to='/login' />) : (<Component {...props} /> )} exact/>
       
        // );

        //   props => !isAuthenticated && !loading ? 
        //      (<Navigate to='/login' />) : (<Component {...props}>children</Component>)
        
        
        return (!isAuthenticated && !loading ? (<Navigate to='/login' />) : (children))

    
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)