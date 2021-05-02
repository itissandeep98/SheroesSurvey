import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				key: action.key,
				userId: action.userId,
				errmess: null,
				isLoading: false,
			};
		case ActionTypes.REGISTER_SUCCESS:
			return {
				...state,
				key: action.key,
				userId: action.userId,
				errmess: null,
				isLoading: false,
			};

		case ActionTypes.LOGOUT_SUCCESS:
			return {
				isLoading: false,
			};
		default:
			return state;
	}
};

export default authReducer;
