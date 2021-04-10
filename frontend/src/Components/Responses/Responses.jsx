import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { formFetch } from '../../Store/ActionCreators/form';
import Section from './Section';

function Responses(props) {
	const { id } = props?.match?.params;
	const [curr, setCurr] = useState(1);
	const total = 37;
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);

	return (
		<Container>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				<Col>
					<h1>{details.heading} </h1>
				</Col>
			</Row>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				<Col>
					<h3>Total 37 Responses</h3>
					<IconButton onClick={() => setCurr(Math.max(1, curr - 1))}>
						<ArrowBackIosIcon />
					</IconButton>
					<p className="text-danger d-inline">{curr}</p> of {total} Responses
					<IconButton onClick={() => setCurr(Math.min(total, curr + 1))}>
						<ArrowForwardIosIcon />
					</IconButton>
				</Col>
			</Row>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				<Col>
					{structure.map((sectionId, index) => (
						<Section
							key={Math.random()}
							index={index + 1}
							id={sectionId}
							formId={id}
						/>
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default Responses;
