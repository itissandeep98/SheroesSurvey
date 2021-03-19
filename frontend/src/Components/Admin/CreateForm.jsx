import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, List } from 'semantic-ui-react';
import Section from './Section';
import classNames from 'classnames';
import './style.css';
import Banner from './Banner';

function CreateForm() {
	const [structure, setStructure] = useState([[{ type: 'text' }]]);
	const [curr, setCurr] = useState(0);

	const addSection = () => {
		setStructure([...structure, [{ type: 'text' }]]);
		setCurr(structure.length);
	};

	const removeSection = index => {
		setStructure([...structure.slice(0, index), ...structure.slice(index + 1)]);
		setCurr(curr - 1);
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

	const reOrderQuestion = (section, list) => {
		console.log(list);
		const temp = [...structure];
		temp[section] = list;
		setStructure(temp);
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
		<Container className="mt-3" fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<Row>
						<Col className="text-center">
							<h1>Create a new Form</h1>
						</Col>
					</Row>
					<Row>
						<Banner />
					</Row>

					<Row className="mt-4">
						<Col>
							<div className="sticky-top text-center" style={{ zIndex: 0 }}>
								<br />
								<Button onClick={addSection} size="mini">
									<Icon name="plus" />
									Add Section
								</Button>
								<List>
									{structure.map((section, i) => (
										<List.Item
											as="a"
											key={i}
											onClick={() => setCurr(i)}
											className={classNames('text-center mb-2', {
												'text-danger': curr === i,
												'text-dark ': curr !== i,
											})}>
											Section {i + 1}
										</List.Item>
									))}
								</List>
							</div>
						</Col>
						{curr > -1 && (
							<Col xs={10}>
								<Section
									queslist={structure[curr]}
									index={curr + 1}
									remove={() => removeSection(curr)}
									addQuestion={() => addQuestion(curr)}
									removeQuestion={q => removeQuestion(curr, q)}
									modifyQuestion={(q, target, value) =>
										modifyQuestion(curr, q, target, value)
									}
									reOrderQuestion={list => reOrderQuestion(curr, list)}
								/>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default CreateForm;
