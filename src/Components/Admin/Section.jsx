import { Col, Container, Row } from 'reactstrap';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import { QuestionTypes } from '../../Utils/QuestionTypes';
import TextInput from './Inputs/TextInput';

function Section(props) {
	const { queslist, index } = props;
	return (
		<Container>
			<Row className=" p-4 mb-4 rounded-lg shadow">
				<Col>
					<h1>
						{' '}
						Section {index}
						<Icon
							name="trash"
							className="text-danger float-right"
							onClick={props.remove}
						/>
					</h1>
					{queslist.map((ques, i) => (
						<>
							{ques.type == 'text' && (
								<TextInput ques={ques.ques} index={i + 1} />
							)}
							<br />
							<Dropdown
								placeholder="Select Question Type"
								search
								selection
								clearable
								options={QuestionTypes}
							/>
							<br />
							<br />
						</>
					))}
				</Col>
				<Col xs={12}>
					<Button floated="right" onClick={props.addQuestion}>
						<Icon name="plus" />
						Add Question
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Section;
