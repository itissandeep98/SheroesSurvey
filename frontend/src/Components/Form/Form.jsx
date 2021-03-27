import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Divider, Icon } from 'semantic-ui-react';
import Banner from './Banner';
import Section from './Section';
import { useDispatch } from 'react-redux';
import './style.css';
import { formFetch } from '../../Store/ActionCreators/form';

function Form(props) {
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		const { id } = props?.match?.params;
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);
	return (
		<Container className="mb-5">
			<Banner {...details} key={3} />
			<Row>
				<Col>
					{structure.map((section, i) => (
						<Section key={Math.random()} index={i+1} id={section} key={3} />
					))}
				</Col>
			</Row>
			<Button className="float-right" disabled>
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
