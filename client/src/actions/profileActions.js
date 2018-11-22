import axios from 'axios';
import { 
	ERROR_DISPATCH, 
	GET_PROFILE, 
	PROFILE_LOADING, 
	CLEAR_CURRENT_PROFILE, 
	SET_CURRENT_USER,
	GET_PROFILES
} from './types';


export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile')
		.then(res => {
			dispatch({
				type : GET_PROFILE,
				payload : res.data
			})
		})
		.catch(err => {
			dispatch({
				type : GET_PROFILE,
				payload : {}
			})
		})
}

export const setProfileLoading = () => {
	return {
		type : PROFILE_LOADING
	}
}

export const clearCurrentProfile = () => {
	return {
		type : CLEAR_CURRENT_PROFILE
	}
}

//create profile
export const createUserProfile = (profileData, history) => dispatch => {
	axios.post('/api/profile', profileData)
		.then(res => {
			history.push('/dashboard');
		})
		.catch(err => {
			console.log(err.response.data);
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		});
}

export const deleteAccount = () => dispatch => {
	if(window.confirm("Are you sure? is can't be undone")){
		axios.delete('/api/profile')
			.then(res => {
				dispatch({
					type: SET_CURRENT_USER,
					payload : {}
				})
			})
			.catch(err => {
				dispatch({
					type : ERROR_DISPATCH,
					payload : err.response.data
				})
			})
	}
}

export const addExperience = (expData, history) => dispatch => {
	axios.post('/api/profile/experience', expData)
		.then(res => {
			history.push('/dashboard');
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}

export const addEducation = (eduData, history) => dispatch => {
	axios.post('/api/profile/education', eduData)
		.then(res => {
			history.push('/dashboard');
		})
		.catch(err => {
			dispatch({
				type : ERROR_DISPATCH,
				payload : err.response.data
			})
		})
}

export const deleteExperience = (id) => dispatch => {
	axios.delete(`/api/profile/experience/${id}`)
		.then(res => {
			dispatch({
				type : GET_PROFILE,
				payload : res.data
			})
		})
		.catch(err => {
			console.log('err', err);
		})
}

export const deleteEducation = (id) => dispatch => {
	axios.delete(`/api/profile/education/${id}`)
		.then(res => {
			dispatch({
				type : GET_PROFILE,
				payload : res.data
			})
		})
		.catch(err => {
			console.log('err', err);
		})
}

export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile/all')
		.then(res => {
			dispatch({
				type : GET_PROFILES,
				payload : res.data
			})
		})
		.catch(err => {
			console.log('err', err);
		})
}

export const getProfileByHandle = (id) => dispatch => {
	axios.get('/api/profile/handle/'+id)
		.then(res => {
			dispatch({
				type : GET_PROFILE,
				payload : res.data
			})
		})
		.catch(err => {
			dispatch({
				type : GET_PROFILE,
				payload : {}
			})
		})
}