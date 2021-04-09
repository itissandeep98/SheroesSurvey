import * as ActionTypes from '../ActionTypes';

const initState = {};

const responseReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.RESPONSE_UPDATE_REQUEST:
			let sec = state[action.section];
			sec = { ...sec, [action.question]: action.value };
			return { ...state, [action.section]: { ...sec } };

		default:
			return state;
	}
};

export default responseReducer;
