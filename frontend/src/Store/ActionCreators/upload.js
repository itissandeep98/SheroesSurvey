import { storage } from '../../Config/fire';
import * as ActionTypes from '../ActionTypes';
import S3 from 'react-aws-s3';

// export const uploadContent = data => {
// 	return async dispatch => {
// 		dispatch({ type: ActionTypes.UPLOAD_REQUEST });
// 		const uploadTask = storage.ref(`/${data.file.name}`).put(data.file);
// 		uploadTask.on(
// 			'state_changed',
// 			snapShot => {},
// 			err => {
// 				console.log(err);
// 				dispatch({ type: ActionTypes.UPLOAD_FAILED, errmess: err });
// 			},
// 			() => {
// 				dispatch({ type: ActionTypes.UPLOAD_SUCCESS });
// 			}
// 		);
// 		return await uploadTask.then(res =>
// 			storage.ref(data.content).child(data.file.name).getDownloadURL()
// 		);
// 	};
// };

export const uploadContent = ({ file }) => {
	const config = {
		bucketName: 'sheroes-sdos',
		region: 'us-east-1',
		accessKeyId: 'ASIAVNGG6RZYSX3QG2OZ',
		secretAccessKey: 'UqYI6NtuaXwOAr2dPr6f1sAlJoFxtpP75Rwmd8TK',
	};
	console.log(config);
	return async dispatch => {
		dispatch({ type: ActionTypes.UPLOAD_REQUEST });
		const uploader = new S3(config);
		uploader
			.uploadFile(file, file.name)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};
};
