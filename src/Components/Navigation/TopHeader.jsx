import { Col, Container, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import './style.css';

function TopHeader() {
	return (
		<Container fluid className="navbar_top shadow sticky-top bg-danger py-4">
			<Row>
				<Col className=" justify-content-center d-flex">
					<Image
						src={process.env.PUBLIC_URL + '/Icons/logo.svg'}
						alt="sheroes"
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default TopHeader;
