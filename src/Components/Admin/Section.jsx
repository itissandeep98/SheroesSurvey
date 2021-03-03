import { Col, Container, Row } from 'reactstrap';
import { Button, Form, Icon, Input, TextArea } from 'semantic-ui-react';
import Question from './Question';

function Section(props) {
	const { queslist, index } = props;
	return (
		<Container className=" p-4 mb-4 rounded_lg shadow bg-white">
			<Row>
				<Col>
					<h1 className="section_name d-inline-block pr-4">Section {index}</h1>
					<Icon
						name="trash"
						size="big"
						className="text-danger float-right"
						onClick={props.remove}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form>
						<Form.Field>
							<label>Description</label>
							<TextArea />
						</Form.Field>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col>
					<br />
					<hr />
					{queslist.map((ques, i) => (
						<div key={Math.random()}>
							<Question
								{...ques}
								index={i + 1}
								remove={() => props.removeQuestion(index - 1, i)}
								modify={(target, value) =>
									props.modifyQuestion(index - 1, i, target, value)
								}
							/>
						</div>
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
