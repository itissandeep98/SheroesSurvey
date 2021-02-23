import { Col, Container, Row } from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';
import Question from './Question';

function Section(props) {
	const { queslist, index } = props;
	return (
		<Container>
			<Row className=" p-4 mb-4 rounded_lg shadow bg-white">
				<Col>
					<h1>
						Section {index}
						<Icon
							name="trash"
							className="text-danger float-right"
							onClick={props.remove}
						/>
					</h1>
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
