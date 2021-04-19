import { storage } from '../../Config/fire';
import * as ActionTypes from '../ActionTypes';

export const uploadContent = data => {
	const filename = new Date().toString() + Math.random();
	return async dispatch => {
		dispatch({ type: ActionTypes.UPLOAD_REQUEST });
		const uploadTask = storage
			.ref(`/${filename}`)
			.put(data, { contentType: data.type });
		uploadTask.on(
			'state_changed',
			snapShot => {},
			err => {
				console.log(err);
				dispatch({ type: ActionTypes.UPLOAD_FAILED, errmess: err });
			},
			() => {
				dispatch({ type: ActionTypes.UPLOAD_SUCCESS });
			}
		);
		return await uploadTask.then(res =>
			storage.ref(`/${filename}`).getDownloadURL()
		);
	};
};
