import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Placeholder } from 'semantic-ui-react';
import { questionFetch } from '../../Store/ActionCreators/question';
import MultipleChoiceInput from './Inputs/MultipleChoiceInput';
import ParagraphInput from './Inputs/ParagraphInput';
import TextInput from './Inputs/TextInput';
import * as ActionTypes from '../../Store/ActionTypes';
import { responseCreate } from '../../Store/ActionCreators/response';

function Question(props) {
	const { id, index, sectionId, formId } = props;
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
		const data = {
			user_id: '2',
			form_id: formId,
			question_id: id,
			response: value,
		};
		dispatch(responseCreate(data));
		dispatch({
			type: ActionTypes.RESPONSE_UPDATE_REQUEST,
			section: sectionId,
			question: id,
			value: value,
		});
	};

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
					{ques.qtype === 'SP' && (
						<TextInput
							modifyResponse={modifyResponse}
							value={props.response?.[sectionId]?.[id]}
						/>
					)}
					{ques.qtype === 'LP' && (
						<ParagraphInput
							modifyResponse={modifyResponse}
							value={props.response?.[sectionId]?.[id]}
						/>
					)}
					{ques.qtype === 'MC' && (
						<MultipleChoiceInput
							modifyResponse={modifyResponse}
							quesId={id}
							value={props.response?.[sectionId]?.[id]}
						/>
					)}
					{/* {ques.qtype == 'number' && <NumberInput />} */}
				</Col>
			</Row>
		</Container>
	);
}

const mapStateToProps = state => ({
	response: state.response,
});
export default connect(mapStateToProps)(Question);
