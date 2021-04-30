import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const questionCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/questions/`, data, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.QUESTION_CREATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const questionFetch = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/questions/${id}/`, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.QUESTION_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const questionUpdate = ({ id, data }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_UPDATE_REQUEST });
		return await axios
			.post(`${apiUrl}/questions/${id}/update_fields/`, data, {
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_UPDATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.QUESTION_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const questionDetailsUpdate = ({ id, data }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_DETAILS_UPDATE_REQUEST });
		return await axios
			.post(`${apiUrl}/shortparas/${id}/update_fields/`, data, {
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_DETAILS_UPDATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.QUESTION_DETAILS_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const questionDelete = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_DELETE_REQUEST });
		return await axios
			.delete(`${apiUrl}/questions/${id}/`, {
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.QUESTION_DELETE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
