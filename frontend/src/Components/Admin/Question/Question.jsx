import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
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
	const [ques, setQues] = useState(null);

	useEffect(() => {
		dispatch(questionFetch(id)).then(res => {
			setQues(res);
		});
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
		<div className="mt-3 mb-5 d-flex align-items-center ">
			{ques && (
				<form className="mr-2 w-100">
					<QuestionSettings
						{...props}
						ques={ques}
						mandatory={ques.mandatory_toggle}
					/>

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
								<Options quesId={id} />
							</Col>
						)}
					</Row>
				</form>
			)}
		</div>
	);
}

export default Question;
