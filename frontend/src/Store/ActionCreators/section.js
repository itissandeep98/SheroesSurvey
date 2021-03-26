import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

export const sectionCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SECTION_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/sections/`, data)
			.then(response => {
				dispatch({
					type: ActionTypes.SECTION_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.SECTION_CREATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const sectionFetch = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SECTION_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/sections/${id}/`)
			.then(response => {
				dispatch({
					type: ActionTypes.SECTION_FETCH_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.SECTION_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const sectionDelete = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SECTION_DELETE_REQUEST });
		return await axios
			.delete(`${apiUrl}/sections/${id}/`)
			.then(response => {
				dispatch({
					type: ActionTypes.SECTION_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.SECTION_DELETE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const sectionUpdate = ({ id, data }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SECTION_UPDATE_REQUEST });
		return await axios
			.post(`${apiUrl}/sections/${id}/update_fields/`, data)
			.then(response => {
				dispatch({
					type: ActionTypes.SECTION_UPDATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.SECTION_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
