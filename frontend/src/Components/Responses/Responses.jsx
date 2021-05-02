/**
 * @module Responses
 */
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { formFetch } from '../../Store/ActionCreators/form';
import Section from './Section';
import NavigationBar from '../Navigation/NavigationBar';
import { responseFetch } from '../../Store/ActionCreators/response';
import { Placeholder } from 'semantic-ui-react';
/**
 * Represents the Responses received for a form.
 * @param {Integer} id - Unique ID of the Form.
 *
 * @property {Object} details -Details of the form
 * @property {String} details.heading -Heading of form
 * @property {List} structure -List of section IDs in form
 *
 */
function Responses(props) {
	const { id } = props?.match?.params;
	const [curr, setCurr] = useState(1);
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const [responses, setResponses] = useState(null);
	const [total, setTotal] = useState(0);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
		dispatch(responseFetch(id)).then(res => {
			setResponses(res);
			setTotal(res?.length);
		});
	}, [dispatch]);

	return (
		<Container>
			<Row>
				<Col className="text-center mt-1">
					<NavigationBar form_id={id} response_toggle={details?.is_active} />
					<h1 className="d-inline text-capitalize">{details.heading}</h1>
				</Col>
			</Row>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				{responses ? (
					<Col>
						<h3>Total {responses.length} Responses</h3>
						<IconButton onClick={() => setCurr(Math.max(1, curr - 1))}>
							<ArrowBackIosIcon />
						</IconButton>
						<p className="text-danger d-inline">{curr}</p> of {total} Responses
						<IconButton onClick={() => setCurr(Math.min(total, curr + 1))}>
							<ArrowForwardIosIcon />
						</IconButton>
						<p className="text-muted float-right">
							Response by {responses?.[curr - 1]?.[1]}
						</p>
					</Col>
				) : (
					<Col>
						<Placeholder fluid>
							<Placeholder.Paragraph>
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder.Paragraph>
						</Placeholder>
					</Col>
				)}
			</Row>
			<Row className="bg-white p-3 mt-3 rounded_lg">
				<Col>
					{structure.map((sectionId, index) => (
						<Section
							key={sectionId}
							index={index + 1}
							id={sectionId}
							formId={id}
							response={responses?.[curr - 1]?.[2]}
						/>
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default Responses;
