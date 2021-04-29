import * as ActionTypes from '../ActionTypes';

const initState = {};

const responseReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.RESPONSE_LOCAL_UPDATE_SUCCESS:
			return { ...state, [action.question]: action.value };

		case ActionTypes.RESPONSE_LOCAL_CLEAR_SUCCESS:
			return {};

		default:
			return state;
	}
};

export default responseReducer;
