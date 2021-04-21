import { TextField, Tooltip } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Label, Row } from 'reactstrap';
import { Icon, Image } from 'semantic-ui-react';
import { uploadContent } from '../../Store/ActionCreators/upload';
import ImageCropper from './ImageCropper';

function Banner(props) {
	const { heading, description, banner_path } = props;
	const [bannerimg, setBannerimg] = useState(banner_path);
	useEffect(() => {
		setBannerimg(banner_path);
	}, [props.banner_path]);
	const [head, setheading] = useState(heading);
	const [desc, setdescription] = useState(description);
	const [modal, setModal] = useState(false);
	const [blob, setBlob] = useState(null);

	const dispatch = useDispatch();
	const handleUpdate = () => {
		const data = {
			heading: head,
			description: desc,
		};
		props.update(data);
	};

	const updateBanner = () => {
		if (blob) {
			dispatch(uploadContent(blob)).then(res => {
				setBannerimg(res);
				props.update({ banner_path: res });
				setModal(false);
			});
		}
	};
	const removeBanner = () => {
		setBannerimg('');
		props.update({ banner_path: '' });
		setModal(false);
	};
	return (
		<Container
			fluid
			className="form_banner px-3 overflow-hidden my-3 bg-white rounded_lg">
			<Row>
				<ImageCropper
					modal={modal}
					toggle={() => setModal(!modal)}
					bannerimg={bannerimg}
					setBlob={setBlob}
					updateBanner={updateBanner}
					removeBanner={removeBanner}
				/>
				<Tooltip title="Click to update Image">
					<div className="w-100 p-0" onClick={() => setModal(true)}>
						<Label className="text-white text-center w-100 btn p-0">
							{bannerimg ? (
								<Image src={bannerimg ?? banner_path} fluid />
							) : (
								<div
									className="p-5"
									style={{
										backgroundColor: '#bfbaba',
									}}>
									<div
										className="display-4 p-3"
										style={{ borderStyle: 'dotted' }}>
										<Icon name="add" /> Add Banner
									</div>
								</div>
							)}
						</Label>
					</div>
				</Tooltip>
				<Col xs={12} className="my-3">
					<form>
						<TextField
							label="Form Title"
							variant="outlined"
							multiline
							fullWidth
							defaultValue={props.heading}
							onChange={e => setheading(e.target.value)}
							onKeyUp={handleUpdate}
							InputLabelProps={{ shrink: true }}
						/>
						<br />
						<br />
						<TextField
							label="Form Description"
							variant="outlined"
							fullWidth
							multiline
							defaultValue={description}
							onChange={e => setdescription(e.target.value)}
							onKeyUp={handleUpdate}
							InputLabelProps={{ shrink: true }}
						/>
					</form>
				</Col>
			</Row>
		</Container>
	);
}

export default Banner;
