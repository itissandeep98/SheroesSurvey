/**
 * @module Admin/Option
 */
import { IconButton, TextField, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { optionUpdate } from '../../../Store/ActionCreators/option';
import DeleteIcon from '@material-ui/icons/Delete';
import PanoramaIcon from '@material-ui/icons/Panorama';
import ClearIcon from '@material-ui/icons/Clear';
import { uploadContent } from '../../../Store/ActionCreators/upload';
import { Image } from 'semantic-ui-react';
import ImageCropper from '../ImageCropper';

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
	const [modal, setModal] = useState(false);
	const [blob, setBlob] = useState(null);
	const dispatch = useDispatch();
	const updateOption = () => {
		const data = {
			content: value,
		};
		dispatch(optionUpdate({ id, data }));
	};
	const handleImage = e => {
		if (blob) {
			dispatch(uploadContent(blob)).then(res => {
				setOptImage(res);
				const data = {
					image_path: res,
				};
				dispatch(optionUpdate({ id, data }));
				setModal(false);
			});
		}
	};
	const deleteImage = e => {
		setOptImage(null);
		const data = {
			image_path: null,
		};
		dispatch(optionUpdate({ id, data }));
		setModal(false);
	};

	return (
		<>
			<ImageCropper
				modal={modal}
				toggle={() => setModal(!modal)}
				bannerimg={optImage}
				setBlob={setBlob}
				updateBanner={handleImage}
				removeBanner={deleteImage}
				aspectX={2000}
				aspectY={2000}
			/>
			<TextField
				variant="outlined"
				label={`Option ${index}`}
				value={value}
				className="w-50"
				onChange={e => setValue(e.target.value)}
				onKeyUp={updateOption}
			/>
			{!optImage ? (
				<Tooltip title="Add Image">
					<IconButton onClick={() => setModal(true)}>
						<PanoramaIcon fontSize="large" />
					</IconButton>
				</Tooltip>
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
