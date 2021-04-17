import { useEffect, useState } from 'react';
import { Col, Container, Progress, Row } from 'reactstrap';
import { Button, Divider, Icon } from 'semantic-ui-react';
import Banner from './Banner';
import Section from './Section';
import { useDispatch } from 'react-redux';
import './style.css';
import { formFetch } from '../../Store/ActionCreators/form';
import { useHistory } from 'react-router';
import ConsentPage from './ConsentPage';

function Form(props) {
	const { id } = props?.match?.params;
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const [curr, setCurr] = useState(0);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);

	const history = useHistory();

	return (
		<Container className="mb-5">
			<ConsentPage />
			<Banner {...details} key={3} />
			{structure.length > 0 && (
				<>
					<Row>
						<Col>
							<Progress value={curr + 1} max={structure.length} color="danger">
								{Math.floor(((curr + 1) / structure.length) * 100)}%
							</Progress>
							<br />
						</Col>
					</Row>

					<Section
						key={structure[curr]}
						index={curr + 1}
						id={structure[curr]}
						formId={props?.match?.params.id}
					/>
				</>
			)}
			{curr > 0 && (
				<Button
					className="float-left rounded-pill"
					onClick={() => setCurr(curr - 1)}>
					<Icon name="arrow left" />
					Back
				</Button>
			)}
			{curr < structure.length - 1 && (
				<Button
					className="float-right rounded-pill"
					onClick={() => setCurr(curr + 1)}>
					Next
					<Icon name="arrow right" />
				</Button>
			)}
			{curr === structure.length - 1 && (
				<>
					<Button
						className="float-right"
						onClick={() => history.push(`/${id}/thank`)}>
						<Icon name="check" />
						Submit
					</Button>
					<br />
					<br />
					<Divider horizontal>End of the Form</Divider>
				</>
			)}
			<br />
			<br />
			<br />
			<br />
		</Container>
	);
}

export default Form;
