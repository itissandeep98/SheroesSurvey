/**
 * @module Admin/Option
 */
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { optionUpdate } from '../../../Store/ActionCreators/option';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input, Label } from 'reactstrap';
import PanoramaIcon from '@material-ui/icons/Panorama';
import ClearIcon from '@material-ui/icons/Clear';
import { uploadFiles } from '../../../Store/ActionCreators/upload';
import { Image } from 'semantic-ui-react';

/**
 * Represents a Single Option in Multiple Choice Question On Admin Panel.
 * @param {Integer} id - Unique ID of the option.
 * @param {Integer} index - Position of Option in List.
 * @param {String} content - Text of the option.
 *
 * @property {Function} updateOption -Updates the content in option
 */

function Option(props) {
	const { id, index, content, deleteOption, image_path } = props;
	const [value, setValue] = useState(content);
	const [optImage, setOptImage] = useState(image_path);
	const dispatch = useDispatch();
	const updateOption = () => {
		const data = {
			content: value,
		};
		dispatch(optionUpdate({ id, data }));
	};
	const handleImage = e => {
		const file = e.target.files[0];
		if (file) {
			const data = {
				content: 'Images',
				file: file,
			};
			dispatch(uploadFiles(data)).then(res => {
				setOptImage(res);
				const data = {
					image_path: res,
				};
				dispatch(optionUpdate({ id, data }));
			});
		}
	};
	const deleteImage = e => {
		setOptImage(null);
		const data = {
			image_path: null,
		};
		dispatch(optionUpdate({ id, data }));
	};

	return (
		<>
			<TextField
				variant="outlined"
				label={`Option ${index}`}
				value={value}
				className="w-50"
				onChange={e => setValue(e.target.value)}
				onKeyUp={updateOption}
			/>
			{!optImage ? (
				<Label className="btn p-2">
					<Tooltip title="Add Image">
						<PanoramaIcon fontSize="large" />
					</Tooltip>
					<Input type="file" hidden onChange={handleImage} />
				</Label>
			) : (
				<>
					<Image src={optImage} size="tiny" className="d-inline ml-2" />
					<IconButton onClick={deleteImage}>
						<ClearIcon />
					</IconButton>
				</>
			)}
			<IconButton onClick={deleteOption} className="float-right">
				<DeleteIcon />
			</IconButton>
		</>
	);
}

export default Option;
