import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Input, Label, Row } from 'reactstrap';
import { Form, Icon, Image, TextArea } from 'semantic-ui-react';
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
						maxHeight: '20rem',
					}}>
					<Label
						className="text-info w-100 h-100 text-center "
						style={{
							cursor: 'pointer',
						}}>
						{bannerimg ? (
							<Image src={bannerimg} />
						) : (
							<>
								<br />
								<Icon name="add" /> Add Banner
							</>
						)}
						<Input type="file" accept="image/*" hidden onChange={handleImage} />
					</Label>
				</div>
				<Col xs={12} className="my-3">
					<Form>
						<Form.Field>
							<Input
								placeholder="Form title"
								defaultValue={heading}
								onChange={e => setheading(e.target.value)}
								onKeyUp={handleUpdate}
							/>
						</Form.Field>
						<Form.Field>
							<TextArea
								placeholder="Form Description"
								defaultValue={description}
								onChange={e => setdescription(e.target.value)}
								onKeyUp={handleUpdate}
							/>
						</Form.Field>
						{/* <Button className="float-right" onClick={handleUpdate}>
							<Icon name="check" />
							Update
						</Button> */}
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Banner;
