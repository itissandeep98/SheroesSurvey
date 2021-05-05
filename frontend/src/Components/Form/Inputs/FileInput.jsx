/**
 * @module User/FileInput
 */
import { useState } from 'react';
import { Form, Input, Label } from 'reactstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.scss';
import { IconButton, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { uploadFiles } from '../../../Store/ActionCreators/upload';
import { showAlert } from '../../Alert';

/**
 * shows the multiple options of MCQ.
 * @param {Integer} quesId - Unique ID of the Question.
 * @param {Boolean} required - Whether Question is mandatory or not
 *
 * @property {Function} handleChange - Modifies the response of user
 */
function FileInput(props) {
	const { required, limit_mb } = props;
	const [link, setLink] = useState(props.value);
	const dispatch = useDispatch();
	const handleChange = e => {
		const file = e.target.files[0];
		if (file) {
			if (file.size / (1024 * 1024) > limit_mb) {
				showAlert(`File Size should be Less than ${limit_mb} MB`);
				return;
			}
			const data = {
				content: 'Files',
				file: file,
			};
			dispatch(uploadFiles(data)).then(res => {
				setLink(res);
				props.modifyResponse(res);
			});
		}
	};
	const handleDelete = () => {
		setLink(null);
	};
	return (
		<div className="d-flex flex-row align-items-center ">
			{!link ? (
				<>
					<Label className="file_input">
						Upload File
						<Input
							type="file"
							onChange={handleChange}
							required={required}
							hidden
						/>
					</Label>
					<small className="text-muted">
						File Size should be Less than {limit_mb} MB
					</small>
				</>
			) : (
				<div className="ml-2">
					<Tooltip title="Open file in new tab">
						<a href={link} target="__blank" rel="noopener noreferer">
							File
							<AttachmentIcon />
						</a>
					</Tooltip>
					<Tooltip title="Remove file">
						<IconButton onClick={handleDelete}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</div>
			)}
		</div>
	);
}

export default FileInput;
