/**
 * @module Admin/Question
 */

import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Dropdown, Placeholder } from 'semantic-ui-react';
import {
	questionFetch,
	questionUpdate,
} from '../../../Store/ActionCreators/question';
import { QuestionTypes } from '../../../Utils/QuestionTypes';
import Options from './Options';
import QuestionSettings from './QuestionSettings';

/**
 * Represents a Single Question On Admin Panel.
 * @param {Integer} id - Unique ID of the Question.
 * @param {Integer} index - Position of Question in Section.
 * @param {List} QuestionTypes - List of all available Types of Questions
 *
 * @property {Object} ques - Contains all details of the Question
 * @property {String} ques.qtype - Type of Question('LP','SP','MC','FU' etc)
 * @property {String} ques.statement - Question Statement
 * @property {Boolean} ques.mandatory_toggle - Whether the Question is mandatory
 * @property {Function} updateQuestion -Updates the content in Question
 *
 */

function Question(props) {
	const { id, index } = props;
	const dispatch = useDispatch();
	const [ques, setQues] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(questionFetch(id)).then(res => {
			setQues(res);
			setLoading(false);
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
		<>
			{loading ? (
				<Placeholder>
					<Placeholder.Paragraph>
						<Placeholder.Header />
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Paragraph>
				</Placeholder>
			) : (
				<div className="mt-3 mb-5 d-flex align-items-center ">
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
				</div>
			)}
		</>
	);
}

export default Question;
