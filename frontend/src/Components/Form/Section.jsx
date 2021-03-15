import { Col, Container, Row } from 'reactstrap';
import NumberInput from './Inputs/NumberInput';
import ParagraphInput from './Inputs/ParagraphInput';
import TextInput from './Inputs/TextInput';
import MultipleChoiceInput from './Inputs/MultipleChoiceInput';

function Section(props) {
	const { questions, heading, desc, index } = props;
	return (
		<Container fluid className=" p-4 mb-4 rounded_lg  bg-white">
			<Row>
				<Col>
					<h1 className="section_name d-inline-block pr-4">Section {index}</h1>
					<h3>{heading}</h3>
					<p className="text-justify">{desc}</p>
					{questions.map((ques, i) => (
						<>
							{ques.type == 'text' && <TextInput {...ques} index={i + 1} />}
							{ques.type == 'number' && <NumberInput {...ques} index={i + 1} />}
							{ques.type == 'paragraph' && (
								<ParagraphInput {...ques} index={i + 1} />
							)}
							{ques.type == 'multiple' && (
								<MultipleChoiceInput {...ques} index={i + 1} />
							)}
						</>
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default Section;
