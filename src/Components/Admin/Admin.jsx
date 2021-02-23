import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';
import Section from './Section';

function Admin() {
	const [structure, setStructure] = useState([]);

	const addSection = () => {
		setStructure([...structure, [{ type: 'text' }]]);
	};

	const removeSection = index => {
		setStructure([...structure.slice(0, index), ...structure.slice(index + 1)]);
	};

	const addQuestion = index => {
		const temp = [...structure];
		temp[index] = [...temp[index], { type: 'text' }];
		setStructure(temp);
	};

	const removeQuestion = (section, index) => {
		const temp = [...structure];

		if (temp[section].length === 1) {
			removeSection(section);
		} else {
			temp[section] = [
				...temp[section].slice(0, index),
				...temp[section].slice(index + 1),
			];
			setStructure(temp);
		}
	};

	const modifyQuestion = (section, index, target, value) => {
		// console.log(target,value);
		const temp = structure[section];
		temp[index] = { ...temp[index], [target]: value };
		setStructure([
			...structure.slice(0, section),
			temp,
			...structure.slice(section + 1),
		]);
	};

	return (
		<Container className="mt-3">
			<Row>
				<Col>
					{structure.map((section, i) => (
						<Section
							key={Math.random()}
							queslist={section}
							index={i + 1}
							remove={() => removeSection(i)}
							addQuestion={() => addQuestion(i)}
							removeQuestion={removeQuestion}
							modifyQuestion={modifyQuestion}
						/>
					))}
				</Col>
			</Row>
			<Row>
				<Col>
					<Button floated="right" onClick={addSection} className="mb-5">
						<Icon name="plus" />
						Add Section
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Admin;
