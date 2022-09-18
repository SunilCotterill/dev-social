import axios from 'axios';
import {setAlert} from './alert';

import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from './types'

import { useNavigate } from "react-router-dom";


//Function to get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (e) {
        console.error(JSON.stringify(e))
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}


// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({
        type : CLEAR_PROFILE
    });
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (e) {
        console.error(JSON.stringify(e))
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

// Get profile by userID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (e) {
        console.error(JSON.stringify(e))
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (e) {
        console.error(JSON.stringify(e))
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Action to create or update a profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if(!edit){
            //this is done because in an action you can't redirect 
            navigate('/dashboard');
        }


    } catch (e) {
        const errors = e.response.data.errors;

        if(errors){
            errors.forEach(element => dispatch(setAlert(element.msg,'danger')));
        }

       
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}


export const addExperience = (formData, navigate) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        
        dispatch(setAlert('Experience Added', 'success'));
            
        navigate('/dashboard');



    } catch (e) {
        const errors = e.response.data.errors;

        if(errors){
            errors.forEach(element => dispatch(setAlert(element.msg,'danger')));

            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
} 


export const addEducation = (formData, navigate) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        
        dispatch(setAlert('Education Added', 'success'));
            
        navigate('/dashboard');

    } catch (e) {
        const errors = e.response.data.errors;

        if(errors){
            errors.forEach(element => dispatch(setAlert(element.msg,'danger')));

            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
} 

export const deleteExperience = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Deleted', 'success'));
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deleteEducation = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Deleted', 'success'));
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account?')){
        try {
           await axios.delete(`/api/profile`)
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
    
            dispatch(setAlert('Your account has been successfully deleted'));
        } catch (e) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
    
}