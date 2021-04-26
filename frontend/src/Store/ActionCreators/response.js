import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

const headers = {
	Authorization: 'Token ' + getAuthToken(),
};

export const responseCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.RESPONSE_CREATE_REQUEST });
		return await axios
			.post(apiUrl + '/responses/', data, { headers })
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

export const responseFetch = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.RESPONSE_FETCH_REQUEST });
		return await axios
			.get(apiUrl + '/responses/', data, { headers })
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
