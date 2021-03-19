import { useState } from 'react';
import { Col, Container, Input, Label, Row } from 'reactstrap';
import { Button, Form, Icon, Image, TextArea } from 'semantic-ui-react';

function Banner(props) {
	const { heading, description, banner_path } = props;
	const [bannerimg, setBannerimg] = useState(props.banner_path);

	const [head, setheading] = useState(heading);
	const [desc, setdescription] = useState(description);

	const handleUpdate = () => {
		const data = {
			heading: head,
			description: desc,
		};
		props.update(data);
	};

	const handleImage = e => {
		console.log(e.target.files);
		const file = e.target.files[0];
		if (file) {
			setBannerimg(URL.createObjectURL(file));
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
							/>
						</Form.Field>
						<Form.Field>
							<TextArea
								placeholder="Form Description"
								defaultValue={description}
								onChange={e => setdescription(e.target.value)}
							/>
						</Form.Field>
						<Button className="float-right" onClick={handleUpdate}>
							<Icon name="check" />
							Update
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default Banner;
