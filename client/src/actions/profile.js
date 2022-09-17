import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
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