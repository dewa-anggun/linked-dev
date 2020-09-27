import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_UPVOTES,
  DELETE_POST,
  ADD_POST
} from './types';

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add upvote
export const addUpvote = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/upvote/${id}`); // id => postId
    dispatch({
      type: UPDATE_UPVOTES,
      payload: { id, upvotes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove upvote
export const removeUpvote = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unvote/${id}`); // id => postId
    dispatch({
      type: UPDATE_UPVOTES,
      payload: { id, upvotes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`); // id => postId
    dispatch({
      type: DELETE_POST,
      payload: id // payload only send id, so that reducer know how to filter out the posts that got deleted from UI
    });
    dispatch(setAlert('Post Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/posts/', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
