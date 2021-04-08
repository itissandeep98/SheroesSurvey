import React, { useState } from 'react';
import { Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import { ShortQuestions } from '../../../Utils/QuestionTypes';

function QuestionSettings(props) {
	const { modal, toggle, qtype } = props;
	const [type, setType] = useState('TXT');

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>More Options</ModalHeader>
			<ModalBody>
				{qtype === 'SP' && (
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
							<Col className="mt-3">
								<Input
									fluid
									type="number"
									placeholder="Limit number of characters"
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
			</ModalBody>
		</Modal>
	);
}

export default QuestionSettings;
