import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

export const sectionCreate = ( data ) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SECTION_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/sections/`, data)
			.then(response => {
				dispatch({
					type: ActionTypes.SECTION_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data
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
