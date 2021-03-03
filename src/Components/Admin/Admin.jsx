import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, Tab } from 'semantic-ui-react';
import Section from './Section';
import './style.css';

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
	const panes = structure.map((section, i) => ({
		menuItem: `Section ${i + 1}`,
		render: () => (
			<Tab.Pane attached={false}>
				<Section
					key={Math.random()}
					queslist={section}
					index={i + 1}
					remove={() => removeSection(i)}
					addQuestion={() => addQuestion(i)}
					removeQuestion={removeQuestion}
					modifyQuestion={modifyQuestion}
				/>
			</Tab.Pane>
		),
	}));

	return (
		<Container className="mt-3" fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<Row>
						<Col className="text-center">
							<h1>Create a new Form</h1>
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
					<Row>
						<Col>
							<Tab
								menu={{ secondary: true, pointing: true, vertical: true }}
								panes={panes}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Admin;
