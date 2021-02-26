import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, Image } from 'semantic-ui-react';

function Banner(props) {
	const { name, desc, banner } = props;
	const [hidden, setHidden] = useState(true);

	return (
		<Container
			fluid
			className="form_banner px-3 overflow-hidden my-3 bg-white rounded_lg">
			<Row>
				<span class="faded faded-bottom">
					<Image src={banner} />
				</span>
				<Col className="my-3">
					<h1>{name}</h1>
					<p
						className={
							'text-justify overflow-hidden form_desc ' +
							(!hidden && 'hidden_banner')
						}>
						{desc}
					</p>
				</Col>
			</Row>
			<Row>
				<Col className="text-center mt-n4">
					<Button icon className="bg-white" onClick={() => setHidden(!hidden)}>
						<Icon name={'chevron ' + (hidden ? 'up' : 'down')} />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Banner;
