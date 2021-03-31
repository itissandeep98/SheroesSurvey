import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

export const questionCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/questions/`, data)
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
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
			.get(`${apiUrl}/questions/${id}/`)
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
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
			.post(`${apiUrl}/questions/${id}/update_fields/`, data)
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_UPDATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.QUESTION_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const questionDelete = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.QUESTION_DELETE_REQUEST });
		return await axios
			.delete(`${apiUrl}/questions/${id}/`)
			.then(response => {
				dispatch({
					type: ActionTypes.QUESTION_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.QUESTION_DELETE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
