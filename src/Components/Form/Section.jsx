import { Col, Container, Row } from 'reactstrap';
import NumberInput from './Inputs/NumberInput';
import ParagraphInput from './Inputs/ParagraphInput';
import TextInput from './Inputs/TextInput';

function Section(props) {
	const { queslist, index } = props;
	return (
		<Container fluid className="border p-4 mb-4 rounded-lg shadow">
			<Row>
				<Col>
					<h1> Section {index}</h1>
					{queslist.map((ques, i) => (
						<>
							{ques.type == 'text' && (
								<TextInput ques={ques.ques} index={i + 1} />
							)}
							{ques.type == 'number' && (
								<NumberInput ques={ques.ques} index={i + 1} />
							)}
							{ques.type == 'paragraph' && (
								<ParagraphInput ques={ques.ques} index={i + 1} />
							)}
						</>
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default Section;
