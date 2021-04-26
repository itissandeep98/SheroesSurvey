/**
 * @module User/Section
 */
import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sectionFetch } from '../../Store/ActionCreators/section';
import Question from './Question';
import { List, Placeholder } from 'semantic-ui-react';

/**
 * Shows the Section of form.
 * @param {Integer} id - Unique ID of the Section.
 * @param {Integer} index - Position of section in form.
 *
 * @property {Object} details - Details of the section
 * @property {String} details.description - Description of Section
 * @property {String} details.heading - Heading of Section
 * @property {List} details.question_sequence - List of Question IDs
 * 
 */
function Section(props) {
	const { id, index } = props;
	const [quesList, setQuesList] = useState([]);
	const [details, setDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(sectionFetch(props.id)).then(res => {
			setQuesList(res?.question_sequence);
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
						<h2 className="section_name d-inline-block pr-4">
							Section {index}
						</h2>
						<h3 className="text-capitalize">{details?.heading}</h3>
						<p className="text-justify text-muted">{details?.description}</p>
						<hr />
						<List>
							{quesList &&
								quesList.map((ques, i) => (
									<List.Item key={ques}>
										<Question
											id={ques}
											index={i + 1}
											sectionId={id}
											formId={props.formId}
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
