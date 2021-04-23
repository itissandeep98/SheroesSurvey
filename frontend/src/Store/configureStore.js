import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './Reducers/rootReducer';
import persistStore from 'redux-persist/es/persistStore';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(
	rootReducer,
	process.env.NODE_ENV === 'production'
		? applyMiddleware(thunk)
		: composeEnhancers(applyMiddleware(thunk, logger))
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };
