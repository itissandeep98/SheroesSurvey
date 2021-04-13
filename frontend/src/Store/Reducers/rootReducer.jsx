import { combineReducers } from 'redux';
import authReducer from './authReducer';
import formReducer from './formReducer';
import responseReducer from './responseReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	form: formReducer,
	response: responseReducer,
	user: userReducer,
	auth: authReducer,
});

export default rootReducer;
