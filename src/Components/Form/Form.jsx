import { Button, Col, Container, Row } from 'reactstrap';
import { Divider, Icon } from 'semantic-ui-react';
import { FormStructure } from '../../Utils/FormStructure';
import Section from './Section';

function Form(props) {
	const structure = FormStructure;
	return (
		<Container>
			<Row>
				<Col className="text-center mt-3">
					<h2>Form ID: {props.match.params.id}</h2>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col>
					{structure.map((section, i) => (
						<Section key={Math.random()} queslist={section} index={i + 1} />
					))}
				</Col>
			</Row>
			<Divider horizontal>End of the Form</Divider>
			<Button className="float-right"> Submit</Button>
		</Container>
	);
}

export default Form;
