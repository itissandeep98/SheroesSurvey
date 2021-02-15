import { Col, Container, Row } from 'reactstrap';
import './style.css';

function TopHeader() {
	return (
		<Container fluid className="navbar_top shadow sticky-top bg-danger py-4">
			<Row>
				<Col className="text-center">
					<h1>SHeroes</h1>
				</Col>
			</Row>
		</Container>
	);
}

export default TopHeader;
