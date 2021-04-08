import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Placeholder } from 'semantic-ui-react';
import { questionFetch } from '../../Store/ActionCreators/question';
import MultipleChoiceInput from './Inputs/MultipleChoiceInput';
import ParagraphInput from './Inputs/ParagraphInput';
import TextInput from './Inputs/TextInput';

function Question(props) {
	const { id, index } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
	const [loading, setLoading] = useState(true);
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
					{ques.qtype === 'SP' && <TextInput />}
					{ques.qtype === 'LP' && <ParagraphInput />}
					{ques.qtype === 'MC' && <MultipleChoiceInput />}
					{/* {ques.qtype == 'number' && <NumberInput />} */}
				</Col>
			</Row>
		</Container>
	);
}

export default Question;
