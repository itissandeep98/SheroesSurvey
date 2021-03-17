import { Col, Container, Row } from 'reactstrap';
import {
	Button,
	Dropdown,
	Form,
	Icon,
	Input,
	TextArea,
} from 'semantic-ui-react';
import { ReactSortable } from 'react-sortablejs';
import Question from './Question';

function Section(props) {
	const { queslist, index } = props;

	return (
		<Container>
			<Row className="p-4 mb-4 rounded_lg  bg-white">
				<Col>
					<h1 className="section_name d-inline-block pr-4">Section {index}</h1>
					<Dropdown
						className="float-right"
						item
						direction="left"
						icon={<Icon name="ellipsis vertical" size="large" />}
						simple>
						<Dropdown.Menu>
							<Dropdown.Item onClick={props.remove}>
								<Icon name="trash" />
								Delete
							</Dropdown.Item>
							<Dropdown.Item disabled>
								<Icon name="copy outline" />
								Duplicate
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col xs={12}>
					<Form>
						<Form.Field>
							<label>Description</label>
							<TextArea />
						</Form.Field>
					</Form>
				</Col>
			</Row>

			<Row className="p-4 mb-4 rounded_lg  bg-white">
				<Col>
					{/* <ReactSortable
						list={queslist}
						setList={props.reOrderQuestion}
						animation={200}
						delayOnTouchStart={true}
						delay={20}
					> */}
					{queslist &&
						queslist.map((ques, i) => (
							<div key={Math.random()}>
								<Question
									{...ques}
									index={i + 1}
									remove={() => props.removeQuestion(i)}
									modify={(target, value) =>
										props.modifyQuestion(i, target, value)
									}
								/>
							</div>
						))}
					{/* </ReactSortable> */}
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
