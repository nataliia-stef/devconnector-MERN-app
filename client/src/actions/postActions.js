import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST
} from './types';

//Add post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Get all posts
export const getAllPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

//Get a Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

//Delete post
export const deletePost = postID => dispatch => {
  axios
    .delete(`/api/posts/${postID}`)
    .then(res => dispatch({ type: DELETE_POST, payload: postID }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
