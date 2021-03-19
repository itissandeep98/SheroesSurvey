import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
};

const formReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.FORM_CREATE_REQUEST:
			return { ...state, errmess: null, isLoading: true };

		case ActionTypes.FORM_CREATE_SUCCESS:
			return { ...state, errmess: null, data: action.data, isLoading: false };

		case ActionTypes.FORM_CREATE_FAILED:
			return { ...state, errmess: action.errmess, isLoading: false };

		case ActionTypes.FORM_FETCH_REQUEST:
			return { ...state, errmess: null, isLoading: true };

		case ActionTypes.FORM_FETCH_SUCCESS:
			return { ...state, errmess: null, data: action.data, isLoading: false };

		case ActionTypes.FORM_FETCH_FAILED:
			return { ...state, errmess: action.errmess, isLoading: false };

		default:
			return state;
	}
};

export default formReducer;
