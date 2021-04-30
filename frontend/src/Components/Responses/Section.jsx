/**
 * @module Responses/Section
 */
import { Col, Container, Row, Spinner } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sectionFetch } from '../../Store/ActionCreators/section';
import Question from './Question';
import { List, Placeholder } from 'semantic-ui-react';
/**
 * Represents a section of form in response viewing.
 * @param {Integer} id - Unique ID of the Section.
 *
 * @property {Object} details -Details of section
 * @property {String} details.heading -heading of section
 * @property {String} details.description -Description of section
 * @property {String} quesList List of question IDs in section
 *
 */
function Section(props) {
	const { id, response } = props;
	const [quesList, setQuesList] = useState([]);
	const [details, setDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(sectionFetch(props.id)).then(res => {
			setQuesList(res.question_sequence);
			setDetails(res);
			setLoading(false);
		});
	}, [dispatch]);

	return (
		<Container fluid className=" p-4 mb-4 rounded_lg  bg-white">
			<Row>
				{loading ? (
					<Col>
						<Placeholder fluid>
							<Placeholder.Header image>
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder.Header>
							<Placeholder.Paragraph>
								<Placeholder.Line />
								<Placeholder.Line />
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder.Paragraph>
						</Placeholder>
					</Col>
				) : (
					<Col>
						<h2 className="section_name d-inline-block pr-4 text-capitalize">
							{details.heading}
						</h2>
						<p className="text-justify text-muted">{details.description}</p>
						<hr />
						<List>
							{quesList &&
								quesList.map((ques, i) => (
									<List.Item key={i}>
										<Question
											id={ques}
											index={i + 1}
											resp={response?.[ques]}
										/>
									</List.Item>
								))}
						</List>
					</Col>
				)}
			</Row>
		</Container>
	);
}

export default Section;
