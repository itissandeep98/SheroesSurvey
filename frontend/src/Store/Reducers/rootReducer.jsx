import { combineReducers } from 'redux';
import authReducer from './authReducer';
import formReducer from './formReducer';
import responseReducer from './responseReducer';
import userReducer from './userReducer';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
	key: 'root',
	storage: localForage,
	transforms: [
		encryptTransform({
			secretKey: 'sdakjdasdhjgnfsadasjjkasdjk',
		}),
	],
};

const rootReducer = combineReducers({
	form: formReducer,
	response: responseReducer,
	user: userReducer,
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;