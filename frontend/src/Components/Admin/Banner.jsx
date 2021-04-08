import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Label, Row } from 'reactstrap';
import { Form, Icon, Image, Input, TextArea } from 'semantic-ui-react';
import { uploadContent } from '../../Store/ActionCreators/upload';

function Banner(props) {
	const { heading, description, banner_path } = props;
	const [bannerimg, setBannerimg] = useState(banner_path);
	const [head, setheading] = useState(heading);
	const [desc, setdescription] = useState(description);
	useEffect(() => {
		setBannerimg(props.banner_path);
	}, [props.banner_path]);
	const dispatch = useDispatch();
	const handleUpdate = () => {
		const data = {
			heading: head,
			description: desc,
		};
		props.update(data);
	};

	const handleImage = e => {
		const file = e.target.files[0];
		if (file) {
			dispatch(
				uploadContent({
					file: file,
				})
			).then(res => {
				setBannerimg(res);
				props.update({ banner_path: res });
			});
		}
	};
	return (
		<Container
			fluid
			className="form_banner px-3 overflow-hidden my-3 bg-white rounded_lg">
			<Row>
				<div
					className="w-100"
					style={{
						overflow: 'hidden',
						height: '20rem',
						backgroundColor: '#bfbaba',
					}}>
					<Label
						className="text-white w-100 h-100 text-center d-flex justify-content-center align-items-center"
						style={{
							cursor: 'pointer',
						}}>
						{bannerimg ? (
							<Image src={bannerimg} fluid />
						) : (
							<div className="display-4 p-5" style={{ borderStyle: 'dotted' }}>
								<Icon name="add" /> Add Banner
							</div>
						)}
						<Input type="file" accept="image/*" hidden onChange={handleImage} />
					</Label>
				</div>
				<Col xs={12} className="my-3">
					<form>
						<TextField
							label="Form Title"
							variant="outlined"
							fullWidth
							defaultValue={heading}
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
							rows={10}
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
