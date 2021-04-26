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
import { questionDetailsUpdate } from '../../../Store/ActionCreators/question';
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
	const { modal, toggle, qtype, id } = props;
	const [type, setType] = useState('TXT');
	const [limits, setLimits] = useState({
		limit_length: 100,
		min_value: 0,
		max_value: 100,
	});
	const dispatch = useDispatch();
	const handleUpdate = () => {
		const data = {
			datatype: type,
			limit_length: limits.limit_length,
			min_value: limits.min_value,
			max_value: limits.max_value,
		};
		dispatch(questionDetailsUpdate({ id, data }));
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>More Options</ModalHeader>
			<ModalBody>
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
					<Col className="mt-3">
						<TextField
							fullWidth
							variant="outlined"
							type="number"
							label="Limit number of characters"
							onChange={e =>
								setLimits({ ...limits, limit_length: e.target.value })
							}
						/>
					</Col>
				)}
				{(type === 'INT' || type === 'FLT') && (
					<Col xs={12} className="mt-3">
						<Row>
							<Col>
								<TextField
									fullWidth
									variant="outlined"
									type="number"
									label="Minimum Accepted value"
									onChange={e =>
										setLimits({ ...limits, min_value: e.target.value })
									}
								/>
							</Col>
							<Col>
								<TextField
									fullWidth
									variant="outlined"
									type="number"
									label="Maximum Accepted value"
									onChange={e =>
										setLimits({ ...limits, max_value: e.target.value })
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
