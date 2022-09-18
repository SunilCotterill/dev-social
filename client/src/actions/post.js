import axios from "axios";
import { setAlert } from "./alert";
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";


//Get posts

export const getPosts =() => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
        
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
        
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
        
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        })

        dispatch(setAlert('Post was deleted', 'success'))
        
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const res = await axios.post(`/api/posts`, formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post was posted', 'success'))
        
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}