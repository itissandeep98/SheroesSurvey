import { configureStore } from '../Store/configureStore';

export const getAuthToken = () => {
	const key = configureStore?.getState()?.auth?.key;
	return key;
};
