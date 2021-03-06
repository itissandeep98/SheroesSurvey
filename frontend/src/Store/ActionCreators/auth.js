import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const loginAction = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LOGIN_REQUEST });
		return await axios
			.post(`${apiUrl}/auth/login`, data)
			.then(res => {
				dispatch({
					type: ActionTypes.LOGIN_SUCCESS,
					key: res.data.token,
					userId: res.data.user.id,
				});
				dispatch({
					type: ActionTypes.USER_FETCH_SUCCESS,
					data: res.data.user,
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

export const registerAction = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.REGISTER_REQUEST, data: data });
		return await axios
			.post(`${apiUrl}/auth/register`, data)
			.then(res => {
				dispatch({
					type: ActionTypes.REGISTER_SUCCESS,
					key: res.data.token,
					userId: res.data.user.id,
				});
				dispatch({
					type: ActionTypes.USER_FETCH_SUCCESS,
					data: res.data.user,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.REGISTER_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const logoutAction = () => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LOGOUT_REQUEST });
		return await axios
			.post(`${apiUrl}/auth/logout/`, {}, { headers: headers() })
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
