import { storage } from '../../Config/fire';
import * as ActionTypes from '../ActionTypes';

export const uploadContent = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.UPLOAD_REQUEST });
		const uploadTask = storage.ref(`/${data.file.name}`).put(data.file);
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
			storage.ref(data.content).child(data.file.name).getDownloadURL()
		);
	};
};
