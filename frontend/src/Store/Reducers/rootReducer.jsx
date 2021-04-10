import { combineReducers } from 'redux';
import formReducer from './formReducer';
import responseReducer from './responseReducer';

const rootReducer = combineReducers({
	form: formReducer,
	response: responseReducer,
});

export default rootReducer;
