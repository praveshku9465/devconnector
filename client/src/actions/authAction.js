import { ERROR_DISPATCH, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registeruser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
			.then(res => history.push('/login'))
			.catch(err => {
				dispatch({
					type : ERROR_DISPATCH,
					payload : err.response.data
				});
			});
};

//Login User
export const loginUser = userData => dispatch => {
	axios.post('api/users/login', userData)
		.then(res => {
			const { token } = res.data;
			//set token to localStorage
			localStorage.setItem('jwtToken', token);
			//set token to Auth Header
			setAuthToken(token);
			//decode token to get user object
			const decoded = jwt_decode(token);
			//dispatch 
			dispatch(setCurrentUser(decoded));

		}).catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			});
		});
};

export const setCurrentUser = user => {
	return {
		type : SET_CURRENT_USER,
		payload : user
	}
};

export const logoutUser = () => dispatch => {
	//Remove token from localstorage
	localStorage.removeItem('jwtToken');

	//set auth token to false
	setAuthToken(false);

	//set current user null
	dispatch(setCurrentUser({}));
}