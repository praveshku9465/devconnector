import axios from 'axios';
import { 
	ADD_POST , 
		 ERROR_DISPATCH,
		 GET_POSTS,
		 POST_LOADING,
		 DELETE_POST,
		 GET_POST
} from './types';

//add posts
export const addPost = (postData) => dispatch => {
	axios.post('/api/posts', postData)
		.then(res => {
			dispatch({
				type : ADD_POST,
				payload : res.data
			})
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}

//add comment
export const addComment = (id, postData) => dispatch => {
	axios.post('/api/posts/comment/'+id, postData)
		.then(res => {
			dispatch({
				type : GET_POST,
				payload : res.data
			})
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}

//get posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios.get('/api/posts')
		.then(res => {
			dispatch({
				type : GET_POSTS,
				payload : res.data
			})
		})
		.catch(err => {
			dispatch({
				type : GET_POSTS,
				payload : null
			})
		})
}

//get signle post posts
export const getPost = (id) => dispatch => {
	dispatch(setPostLoading());
	axios.get(`/api/posts/${id}`)
		.then(res => {
			dispatch({
				type : GET_POST,
				payload : res.data
			})
		})
		.catch(err => {
			dispatch({
				type : GET_POST,
				payload : null
			})
		})
}


export const setPostLoading = () => {
	return {
		type : POST_LOADING
	}
}


export const deletePost = (id) => dispatch => {
	axios.delete(`/api/posts/${id}`)
		.then(res => {
			dispatch({
				type : DELETE_POST,
				payload : id
			})
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}


export const likePost = (id) => dispatch => {
	axios.post(`/api/posts/like/${id}`)
		.then(res => {
			dispatch(getPosts());
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}

export const unlikePost = (id) => dispatch => {
	axios.post(`/api/posts/unlike/${id}`)
		.then(res => {
			dispatch(getPosts());
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}

