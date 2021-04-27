import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.USER_FETCH_REQUEST:
			return {
				...state,
				errmess: null,
				isLoading: false,
			};
		case ActionTypes.USER_FETCH_SUCCESS:
			return {
				...state,
				...action.data,
				errmess: null,
				isLoading: false,
			};
		case ActionTypes.USER_FETCH_FAILED:
			return {
				...state,
				errmess: null,
				isLoading: false,
			};

		case ActionTypes.ALL_FORM_FETCH_REQUEST:
			return {
				...state,
				errmess: null,
				isLoading: false,
			};
		case ActionTypes.ALL_FORM_FETCH_SUCCESS:
			return {
				...state,
				forms: action.data,
				errmess: null,
				isLoading: false,
			};
		case ActionTypes.ALL_FORM_FETCH_FAILED:
			return {
				...state,
				forms: null,
				errmess: null,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
