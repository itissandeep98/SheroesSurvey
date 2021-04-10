import { TextField } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Spinner } from 'reactstrap';
import { Dropdown, Icon } from 'semantic-ui-react';
import {
	questionFetch,
	questionUpdate,
} from '../../../Store/ActionCreators/question';
import { QuestionTypes } from '../../../Utils/QuestionTypes';
import Options from './Options';
import QuestionSettings from './QuestionSettings';

function Question(props) {
	const { id, index } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
	const [modal, setModal] = useState(false);
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
			<QuestionSettings
				modal={modal}
				toggle={() => setModal(!modal)}
				qtype={ques.qtype}
			/>
			<div className="mt-3 mb-5 d-flex align-items-center ">
				<form className=" mr-2 w-100">
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
							{ques.qtype === 'SP' && (
								<Dropdown.Item onClick={() => setModal(!modal)}>
									<Icon name="cogs" />
									More Options
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<small className="float-right text-muted ">
						{ques?.created_on ? (
							<>Created {moment(ques?.created_on).fromNow()}</>
						) : (
							<Spinner size="sm" />
						)}
					</small>

					<TextField
						label={`Question ${index}`}
						variant="outlined"
						fullWidth
						multiline
						defaultValue={ques?.statement}
						onChange={e => setQues({ ...ques, statement: e.target.value })}
						onKeyUp={updateQuestion}
						InputLabelProps={{ shrink: true }}
					/>
					<br />
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
								<Options quesId={id}/>
							</Col>
						)}
					</Row>
				</form>
			</div>
		</>
	);
}

export default Question;
