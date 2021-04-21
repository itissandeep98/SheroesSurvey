import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

const headers = {
	Authorization: 'Token ' + getAuthToken(),
};

export const loginAction = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LOGIN_REQUEST });
		return await axios
			.post(`${apiUrl}/auth/login`, data)
			.then(res => {
				console.log(res);
				dispatch({
					type: ActionTypes.LOGIN_SUCCESS,
					key: res.data.token,
					userId: res.data.user.id,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.LOGIN_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const logoutAction = () => {
	console.log(headers);
	return async dispatch => {
		dispatch({ type: ActionTypes.LOGOUT_REQUEST });
		return await axios
			.post(`${apiUrl}/auth/logout/`, {}, { headers })
			.then(res => {
				dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.LOGOUT_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
