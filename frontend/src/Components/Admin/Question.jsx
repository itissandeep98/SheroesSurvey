import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import {
	questionFetch,
	questionUpdate,
} from '../../Store/ActionCreators/question';
import { QuestionTypes } from '../../Utils/QuestionTypes';

function Question(props) {
	const { id, index } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState({});
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
			Question {index}
			<Dropdown
				className="float-right"
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
			<small className="float-right text-muted">
				{ques?.created_on ? (
					<>Created {moment(ques?.created_on).fromNow()}</>
				) : (
					<Spinner size="sm" />
				)}
			</small>
			<div className="mt-3 mb-5 d-flex align-items-center ">
				<Form className=" mr-2 w-100">
					<Input
						fluid
						defaultValue={ques?.statement}
						onChange={e => setQues({ ...ques, statement: e.target.value })}
						placeholder="Type Your Question Here"
						onKeyUp={updateQuestion}
					/>
					<br />
					<Dropdown
						placeholder="Select Question Type"
						search
						selection
						options={QuestionTypes}
						value={ques.qtype}
						onChange={handleType}
					/>
				</Form>
			</div>
		</>
	);
}

export default Question;
