/**
 * @module Responses/Question
 */
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { List, Placeholder } from 'semantic-ui-react';
import { questionFetch } from '../../Store/ActionCreators/question';
import Options from './Options';

/**
 * Represents a Question in Response View.
 * @param {Integer} id - Unique ID of the Question.
 * @param {Integer} index - Position of Question in Section.
 * @param {Integer} sectionId - Unique ID of the Section.
 * @param {Integer} formId - Unique ID of the Form.
 *
 * @property {Object} ques - Details of Question
 * @property {String} ques.qtype - Type of Question('LP','SP','MC','FU' etc)
 * @property {String} ques.statement - Question Statement
 * @property {Boolean} ques.mandatory_toggle - Whether the Question is mandatory
 */
function Question(props) {
	const { id, index, sectionId, formId } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
	const [loading, setLoading] = useState(true);
	const options = ['option 1', 'option 2', 'option 3'];
	useEffect(() => {
		dispatch(questionFetch(id)).then(res => {
			setQues(res);
			setLoading(false);
		});
	}, [dispatch]);

	return (
		<Container className="my-4">
			<Row>
				{loading ? (
					<Col>
						<Placeholder fluid>
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
						<h4 className="text-justify">
							Q{index}: {ques?.statement}
						</h4>
					</Col>
				)}
			</Row>
			<Row>
				<Col>
					{(ques.qtype === 'SP' || ques.qtype === 'LP') && (
						<p className="mt-2 text-justify border p-2">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					)}

					{ques.qtype === 'MC' && <Options quesId={id} />}
				</Col>
			</Row>
		</Container>
	);
}

const mapStateToProps = state => ({
	response: state.response,
});
export default connect(mapStateToProps)(Question);
