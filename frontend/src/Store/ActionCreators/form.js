import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

export const allformFetch = () => {
	return async dispatch => {
		dispatch({ type: ActionTypes.ALL_FORM_FETCH_REQUEST });
		return await axios
			.get(apiUrl + '/forms/')
			.then(response => {
				dispatch({
					type: ActionTypes.ALL_FORM_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.ALL_FORM_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const formCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.FORM_CREATE_REQUEST });
		return await axios
			.post(apiUrl + '/forms/', data)
			.then(response => {
				dispatch({
					type: ActionTypes.FORM_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.FORM_CREATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const formFetch = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.FORM_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/forms/${id}/`)
			.then(response => {
				dispatch({
					type: ActionTypes.FORM_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.FORM_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const formUpdate = ({id,data}) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.FORM_UPDATE_REQUEST });
		return await axios
			.post(`${apiUrl}/forms/${id}/update_fields/`,data)
			.then(response => {
				dispatch({
					type: ActionTypes.FORM_UPDATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.FORM_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
