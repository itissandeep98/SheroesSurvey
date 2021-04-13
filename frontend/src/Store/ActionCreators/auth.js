import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Url';

export const loginAction = (data) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LOGIN_REQUEST });
		dispatch({
			type: ActionTypes.LOGIN_SUCCESS,
			key: 'adasdas-asfnjaksmkxcn',
		});
	};
};

export const logoutAction = () => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LOGOUT_REQUEST });

		dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
	};
};
