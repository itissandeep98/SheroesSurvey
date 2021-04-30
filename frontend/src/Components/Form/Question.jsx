/**
 * @module User/Question
 */
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Icon, Placeholder } from 'semantic-ui-react';
import { questionFetch } from '../../Store/ActionCreators/question';
import MultipleChoiceInput from './Inputs/MultipleChoiceInput';
import ParagraphInput from './Inputs/ParagraphInput';
import TextInput from './Inputs/TextInput';
import { Tooltip } from '@material-ui/core';
import FileInput from './Inputs/FileInput';
import { updateLocalResponse } from '../../Store/ActionCreators/response';

/**
 * Provides the Question view
 * @param {Integer} id - Unique ID of the Question.
 * @param {Integer} formId - Unique ID of the Form.
 * @param {Integer} sectionId - Unique ID of the section.
 * @param {Integer} index - Position of question in section.
 *
 * @property {Function} modifyResponse - modifies the response of user
 *
 */
function Question(props) {
	const { id, index, sectionId, formId } = props;
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(questionFetch(id)).then(res => {
			setQues(res);
			setLoading(false);
		});
	}, [dispatch]);

	const modifyResponse = value => {
		dispatch(updateLocalResponse({ id, value }));
	};

	return (
		<Container className="my-4">
			<Row>
				<Col>
					{loading ? (
						<Placeholder fluid>
							<Placeholder.Paragraph>
								<Placeholder.Line />
								<Placeholder.Line />
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder.Paragraph>
						</Placeholder>
					) : (
						<h4 className="text-justify">
							Q{index}: {ques?.statement}
							{ques.mandatory_toggle && (
								<Tooltip title="Mandatory Question">
									<Icon
										name="asterisk"
										size="small"
										className="text-danger ml-2"
									/>
								</Tooltip>
							)}
						</h4>
					)}
				</Col>
			</Row>
			<Row>
				<Col>
					{ques.qtype === 'SP' && (
						<TextInput
							modifyResponse={modifyResponse}
							value={props.response?.[id]}
							required={ques.mandatory_toggle}
						/>
					)}
					{ques.qtype === 'LP' && (
						<ParagraphInput
							modifyResponse={modifyResponse}
							value={props.response?.[id]}
							required={ques.mandatory_toggle}
						/>
					)}
					{ques.qtype === 'MC' && (
						<MultipleChoiceInput
							modifyResponse={modifyResponse}
							quesId={id}
							value={props.response?.[id]}
							required={ques.mandatory_toggle}
						/>
					)}
					{ques.qtype === 'FU' && (
						<FileInput
							modifyResponse={modifyResponse}
							quesId={id}
							value={props.response?.[id]}
							required={ques.mandatory_toggle}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}

const mapStateToProps = state => ({
	response: state.response,
});
export default connect(mapStateToProps)(Question);
