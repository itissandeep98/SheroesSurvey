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
		console.log(temp, structure);
		setStructure(temp);
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
