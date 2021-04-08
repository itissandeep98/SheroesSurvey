import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Placeholder } from 'semantic-ui-react';
import { questionFetch } from '../../Store/ActionCreators/question';
import MultipleChoiceInput from './Inputs/MultipleChoiceInput';
import ParagraphInput from './Inputs/ParagraphInput';
import TextInput from './Inputs/TextInput';
import * as ActionTypes from '../../Store/ActionTypes';

function Question(props) {
	const { id, index, section } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(questionFetch(id)).then(res => {
			setQues(res);
			setLoading(false);
		});
	}, [dispatch]);

	const modifyQuestion = value => {
		dispatch({
			type: ActionTypes.RESPONSE_UPDATE_REQUEST,
			section: section,
			question: id,
			value: value,
		});
	};
	console.log();

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
							modifyQuestion={modifyQuestion}
							value={props.response?.[section]?.[id]}
						/>
					)}
					{ques.qtype === 'LP' && (
						<ParagraphInput
							modifyQuestion={modifyQuestion}
							value={props.response?.[section]?.[id]}
						/>
					)}
					{ques.qtype === 'MC' && (
						<MultipleChoiceInput
							modifyQuestion={modifyQuestion}
							quesId={id}
							value={props.response?.[section]?.[id]}
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
