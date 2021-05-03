import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const optionCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.OPTION_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/options/`, data, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.OPTION_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.OPTION_CREATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const optionUpdate = ({ id, data }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.OPTION_UPDATE_REQUEST });
		return await axios
			.post(`${apiUrl}/options/${id}/update_fields/`, data, {
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.OPTION_UPDATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.OPTION_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const optionFetch = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.OPTION_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/questions/${id}/get_options/`)
			.then(response => {
				dispatch({
					type: ActionTypes.OPTION_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.OPTION_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const optionDelete = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.OPTION_DELETE_REQUEST });
		return await axios
			.delete(`${apiUrl}/options/${id}/`, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.OPTION_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.OPTION_DELETE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
