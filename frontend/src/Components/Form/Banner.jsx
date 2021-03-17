import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, Image } from 'semantic-ui-react';
import classNames from 'classnames';

function Banner(props) {
	const { name, desc, banner } = props;
	const [hidden, setHidden] = useState(true);
	useEffect(() => {
		window.addEventListener('scroll', () => setHidden(false));
		return () => {
			window.removeEventListener('scroll', () => setHidden(false));
		};
	}, []);

	return (
		<Container
			fluid
			className="form_banner px-3 overflow-hidden my-3 bg-white rounded_lg">
			<Row>
				<span className="faded faded-bottom">
					<Image src={banner} />
				</span>
				<Col className="my-3">
					<h1>{name}</h1>
					<p
						className={classNames(
							'text-justify',
							'overflow-hidden',
							'form_desc ',
							{
								hidden_banner: !hidden,
							}
						)}>
						{desc}
					</p>
				</Col>
			</Row>
			<Row>
				<Col className="text-center mt-n3">
					<Button icon className="bg-white" onClick={() => setHidden(!hidden)}>
						<Icon
							name={classNames('chevron ', {
								up: hidden,
								down: !hidden,
							})}
						/>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Banner;
