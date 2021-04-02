import React from 'react';
import { Col, Container, Row } from 'reactstrap';

function Responses(props) {
	const { id } = props?.match?.params;
	return (
		<Container>
			<Row className="bg-white p-3 rounded_lg">
				<Col>
					<h1>Responses {id}</h1>
				</Col>
			</Row>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				<Col>
					<h3>Work in Progress ...</h3>
				</Col>
			</Row>
		</Container>
	);
}

export default Responses;
