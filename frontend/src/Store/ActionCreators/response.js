import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

export const responseCreate = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.RESPONSE_CREATE_REQUEST });
		return await axios
			.post(apiUrl + '/responses/', data)
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
