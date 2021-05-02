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
import { Col, Container, Row } from 'reactstrap';

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
		<Container>
			<Row>
				<Col xs={12} lg={6} className="align-items-center d-flex">
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
						fullWidth
						onChange={e => setValue(e.target.value)}
						onKeyUp={updateOption}
					/>
				</Col>
				<Col className="d-flex flex-row mb-2">
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
				</Col>
				<Col >
					<IconButton onClick={deleteOption} className="float-right">
						<DeleteIcon />
					</IconButton>
				</Col>
			</Row>
		</Container>
	);
}

export default Option;
