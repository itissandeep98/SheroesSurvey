import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, Image } from 'semantic-ui-react';

function Banner(props) {
	const { name, desc, banner } = props;
	const [height, setHeight] = useState(true);
	const handlehide = () => {
		setHeight(!height);
	};
	return (
		<Container
			fluid
			className="form_banner px-3 overflow-hidden my-3 bg-white rounded_lg">
			<Row>
				<Image src={banner} />
				<Col className="my-3">
					<h1>{name}</h1>
					<p
						className={
							'text-justify overflow-hidden form_desc ' +
							(!height && 'hidden_banner')
						}>
						{desc}
					</p>
				</Col>
			</Row>
			<Row>
				<Col className="text-center mt-n4">
					<Button icon className="bg-white" onClick={handlehide}>
						<Icon name={'chevron ' + (height ? 'up' : 'down')} />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Banner;
