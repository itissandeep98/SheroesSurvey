import { Col, Container, Row } from 'reactstrap';
import { Button, Divider, Icon } from 'semantic-ui-react';
import { FormStructure } from '../../Utils/FormStructure';
import Banner from './Banner';
import Section from './Section';
import './style.css';

function Form(props) {
	const formID = props.match.params.id;
	const { sections, details } = FormStructure;
	return (
		<Container className="mb-5">
			<Banner {...details} />
			<Row>
				<Col>
					{sections.map((section, i) => (
						<Section key={Math.random()} {...section} index={i + 1} />
					))}
				</Col>
			</Row>
			<Button className="float-right">
				<Icon name="check" />
				Submit
			</Button>
			<br />
			<br />
			<Divider horizontal>End of the Form</Divider>
			<br />
			<br />
		</Container>
	);
}

export default Form;
