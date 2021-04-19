import { Button, Slider } from '@material-ui/core';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './style.scss';

const aspectX = 700;
const aspectY = 200;

function ImageCropper(props) {
	const { modal, toggle, updateBanner, blob, setBlob } = props;
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const [inputImg, setInputImg] = useState('');

	const onCropComplete = async (croppedArea, croppedAreaPixels) => {
		const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);
		setBlob(croppedImage);
	};
	const onInputChange = e => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener('load', () => setInputImg(reader.result), false);
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	return (
		<Modal isOpen={modal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle}>Image Crop</ModalHeader>
			<ModalBody>
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
				<Input type="file" accept="image/*" onChange={onInputChange} />
				<Button variant="outlined" onClick={updateBanner}>
					Update Banner
				</Button>
			</ModalFooter>
		</Modal>
	);
}

const createImage = url =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', error => reject(error));
		image.setAttribute('crossOrigin', 'anonymous');
		image.src = url;
	});

export const getCroppedImg = async (imageSrc, crop) => {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	/* setting canvas width & height allows us to 
    resize from the original image resolution */
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
		canvas.toBlob(blob => {
			resolve(blob);
		}, 'image/jpeg');
	});
};

export default ImageCropper;
