/**
 * @module Admin/ImageCropper
 */
import { Button, IconButton, Slider } from '@material-ui/core';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import './style.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import { Image as Imag } from 'semantic-ui-react';

/**
 * Provides a popup with image cropping options.
 * @param {Boolean} modal -Whether Popup is open or not.
 * @param {String} bannerimg - Current Banner image.
 * @param {Function} toggle - Closes the popup.
 * @param {Function} updateBanner - Updates the new Banner image .
 * @param {Function} removeBanner - Removes the existing banner image.
 * @param {Function} setBlob - sets the current Banner Image which is being edited.
 *
 * @property {Function} onCropComplete -Updates Banner Image after crop is complete
 */
function ImageCropper(props) {
	const {
		modal,
		toggle,
		updateBanner,
		removeBanner,
		bannerimg,
		setBlob,
	} = props;
	const aspectX = props.aspectX ?? 3500;
	const aspectY = props.aspectY ?? 1000;
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const [inputImg, setInputImg] = useState('');

	const onCropComplete = async (croppedArea, croppedAreaPixels) => {
		const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);
		setBlob(croppedImage);
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		maxFiles: 1,
		maxSize: 5242880,
		onDrop: acceptedFile => {
			if (acceptedFile.length > 0) {
				const file = acceptedFile[0];
				const reader = new FileReader();
				reader.addEventListener(
					'load',
					() => setInputImg(reader.result),
					false
				);
				if (file) {
					reader.readAsDataURL(file);
				}
			}
		},
	});
	/**
	 * Creates an Image HTML Object with given url of image.
	 * @param {URL} url -URL of Image.
	 *
	 * @returns {HTML} Image object
	 */
	const createImage = url =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', error => reject(error));
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = url;
		});

	/**
	 * Crops the Image with given Crop parameters.
	 * @param {URL} imageSrc -URL of Image.
	 * @param {Object} crop -Crop parameters of image.
	 *
	 *
	 * @returns {BLOB} Image File after getting cropped
	 */
	const getCroppedImg = async (imageSrc, crop) => {
		const image = await createImage(imageSrc);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = aspectX;
		canvas.height = aspectY;

		ctx.drawImage(
			image,
			crop.x,
			crop.y,
			crop.width,
			crop.height,
			0,
			0,
			canvas.width,
			canvas.height
		);

		return new Promise(resolve => {
			canvas.toBlob(
				blob => {
					resolve(blob);
				},
				'image/png',
				1
			);
		});
	};

	return (
		<Modal isOpen={modal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle}>Crop Image</ModalHeader>
			<ModalBody>
				{bannerimg && (
					<div className="mb-2 d-flex">
						<Imag src={bannerimg} size="small" />
						<IconButton onClick={removeBanner}>
							<DeleteIcon fontSize="large" />
						</IconButton>
					</div>
				)}
				<div
					{...getRootProps()}
					className="border py-4 text-muted bg-light text-center"
					style={{ cursor: 'copy' }}>
					<input {...getInputProps()} />
					<p>Drag & Drop Image here, or Click to Select</p>
				</div>
				<small className="text-muted text-center">
					File Size should be less than 5MB
				</small>
			</ModalBody>
			<ModalBody className="bg-light">
				<div className="crop-container ">
					<Cropper
						image={inputImg}
						crop={crop}
						zoom={zoom}
						aspect={aspectX / aspectY}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
				</div>
			</ModalBody>
			<ModalBody>
				<Slider
					value={zoom}
					min={1}
					max={3}
					step={0.1}
					aria-labelledby="Zoom"
					onChange={(e, zoom) => setZoom(zoom)}
					classes={{ root: 'slider' }}
				/>
			</ModalBody>
			<ModalFooter>
				<Button variant="outlined" onClick={updateBanner}>
					Update
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default ImageCropper;
