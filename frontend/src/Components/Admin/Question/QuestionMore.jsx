/**
 * @module Admin/QuestionMore
 */
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import { questionUpdate } from '../../../Store/ActionCreators/question';
import { ShortQuestions } from '../../../Utils/QuestionTypes';

/**
 * Represents a popup to change other options in a Question.
 * @param {Integer} id - Unique ID of the option.
 * @param {Integer} index - Position of Option in List.
 * @param {String} content - Text of the option.
 *
 * @property {Function} updateOption -Updates the content in option
 */

function QuestionMore(props) {
	const { modal, toggle, qtype, id, other_params } = props;
	const [limits, setLimits] = useState({ ...other_params });
	const dispatch = useDispatch();
	const handleUpdate = () => {
		const data = {
			other_ques_params: {
				datatype: limits.datatype,
				limit_length: limits.limit_length,
				min_val: limits.min_val,
				max_val: limits.max_val,
				limit_mb: limits.limit_mb,
			},
		};
		dispatch(questionUpdate({ id, data }));
		toggle();
	};
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>More Options</ModalHeader>
			<ModalBody>
				{qtype === 'SP' && (
					<Col>
						<Dropdown
							placeholder="Select Type"
							search
							selection
							options={ShortQuestions}
							value={limits.datatype}
							onChange={(e, { value }) =>
								setLimits({ ...limits, datatype: value })
							}
							fluid
						/>
					</Col>
				)}
				{qtype === 'FU' && (
					<Col className="mt-3">
						<TextField
							fullWidth
							variant="outlined"
							value={limits.limit_mb}
							type="number"
							label="File Size Limit (in MB)"
							onChange={e => setLimits({ ...limits, limit_mb: e.target.value })}
						/>
					</Col>
				)}
				{limits.datatype === 'TXT' && qtype === 'SP' && (
					<Col className="mt-3">
						<TextField
							fullWidth
							variant="outlined"
							value={limits.limit_length}
							type="number"
							label="Limit number of characters"
							onChange={e =>
								setLimits({ ...limits, limit_length: e.target.value })
							}
						/>
					</Col>
				)}
				{(limits.datatype === 'INT' || limits.datatype === 'FLT') &&
					qtype === 'SP' && (
						<Col xs={12} className="mt-3">
							<Row>
								<Col>
									<TextField
										fullWidth
										value={limits.min_val}
										variant="outlined"
										type="number"
										label="Minimum Accepted value"
										onChange={e =>
											setLimits({ ...limits, min_val: e.target.value })
										}
									/>
								</Col>
								<Col>
									<TextField
										fullWidth
										variant="outlined"
										value={limits.max_val}
										type="number"
										label="Maximum Accepted value"
										onChange={e =>
											setLimits({ ...limits, max_val: e.target.value })
										}
									/>
								</Col>
							</Row>
						</Col>
					)}
			</ModalBody>
			<ModalFooter>
				<Button variant="outlined" onClick={handleUpdate}>
					Update
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default QuestionMore;
