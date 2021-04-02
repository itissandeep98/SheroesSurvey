import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Spinner } from 'reactstrap';
import { Dropdown, Form, Icon, Input, TextArea } from 'semantic-ui-react';
import {
	questionFetch,
	questionUpdate,
} from '../../Store/ActionCreators/question';
import { QuestionTypes, ShortQuestions } from '../../Utils/QuestionTypes';
import Options from './Options';

function Question(props) {
	const { id, index } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
	const [type, setType] = useState('');
	useEffect(() => {
		dispatch(questionFetch(id)).then(res => setQues(res));
	}, [dispatch]);

	const updateQuestion = () => {
		const data = {
			qtype: ques.qtype,
			statement: ques.statement,
		};
		dispatch(questionUpdate({ id, data }));
	};

	const handleType = (e, { value }) => {
		const data = { ...ques, qtype: value };
		setQues(data);
		dispatch(questionUpdate({ id, data }));
	};

	return (
		<>
			<div className="mt-3 mb-5 d-flex align-items-center ">
				<Form className=" mr-2 w-100">
					<Form.Field required>
						<Dropdown
							className="float-right "
							item
							direction="left"
							icon={<Icon name="ellipsis vertical" />}
							simple>
							<Dropdown.Menu>
								<Dropdown.Item onClick={props.remove}>
									<Icon name="trash" />
									Delete
								</Dropdown.Item>
								<Dropdown.Item disabled>
									<Icon name="asterisk" />
									Mark Important
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<small className="float-right text-muted ">
							{ques?.created_on ? (
								<>Created {moment(ques?.created_on).fromNow()}</>
							) : (
								<Spinner size="sm" />
							)}
						</small>
						<label>Question {index}</label>
						<TextArea
							defaultValue={ques?.statement}
							onChange={e => setQues({ ...ques, statement: e.target.value })}
							placeholder="Type Your Question Here"
							onKeyUp={updateQuestion}
						/>
					</Form.Field>
					<br />
					<Row>
						<Col>
							<Dropdown
								placeholder="Select Question Type"
								search
								selection
								options={QuestionTypes}
								value={ques.qtype}
								onChange={handleType}
								fluid
							/>
						</Col>
						{ques.qtype === 'MC' && (
							<Col xs={12}>
								<Options />
							</Col>
						)}
						{ques.qtype === 'SP' && (
							<>
								<Col>
									<Dropdown
										placeholder="Select Type"
										search
										selection
										options={ShortQuestions}
										value={type}
										onChange={(e, { value }) => setType(value)}
										fluid
									/>
								</Col>
								{type === 'TXT' && (
									<Col>
										<Input
											fluid
											type="number"
											placeholder="Limit on number of characters"
											fluid
										/>
									</Col>
								)}
								{(type === 'INT' || type === 'FLT') && (
									<Col xs={12} className="mt-3">
										<Row>
											<Col>
												<Input
													type="number"
													placeholder="Minimum Accepted value"
													fluid
												/>
											</Col>
											<Col>
												<Input
													type="number"
													placeholder="Maximum Accepted value"
													fluid
												/>
											</Col>
										</Row>
									</Col>
								)}
							</>
						)}
					</Row>
				</Form>
			</div>
		</>
	);
}

export default Question;
