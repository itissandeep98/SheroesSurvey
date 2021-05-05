import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const updateLocalResponse = ({ id, value }) => {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESPONSE_LOCAL_UPDATE_SUCCESS,
			question: id,
			value: value,
		});
	};
};

export const clearLocalResponse = () => {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESPONSE_LOCAL_CLEAR_SUCCESS,
		});
	};
};

export const responseCreate = ({ id, data }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.RESPONSE_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/forms/${id}/accept_response/`, data, {
				headers: getAuthToken() && headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.RESPONSE_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.RESPONSE_CREATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const responseFetch = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.RESPONSE_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/forms/${id}/get_response/`, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.RESPONSE_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.RESPONSE_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const generateExcel = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.RESPONSE_EXCEL_CREATE_REQUEST });
		return await axios
			.get(`${apiUrl}/forms/${id}/get_csv/`, { headers: headers() })
			.then(response => {
				console.log(response);
				dispatch({
					type: ActionTypes.RESPONSE_EXCEL_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.RESPONSE_EXCEL_CREATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
