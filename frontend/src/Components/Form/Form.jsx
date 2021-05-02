/**
 * @module User/FormView
 */
import { useEffect, useState } from 'react';
import { Col, Container, Progress, Row } from 'reactstrap';
import { Button, Divider, Icon } from 'semantic-ui-react';
import Banner from './Banner';
import Section from './Section';
import { connect, useDispatch, useSelector } from 'react-redux';
import './style.css';
import { formFetch } from '../../Store/ActionCreators/form';
import { Redirect, useHistory } from 'react-router';
import ConsentPage from './ConsentPage';
import {
	clearLocalResponse,
	responseCreate,
} from '../../Store/ActionCreators/response';

/**
 * Provides the ability to preview the form.
 * @param {Integer} id - Unique ID of the Form taken from the URL.
 *
 * @property {Object} details - Details of the form
 * @property {Boolean} details.is_active - Whether Form is accepting response
 * @property {Boolean} details.consent_toggle - Whether Form has a consent page
 * @property {String} details.consent_text - Consent form details
 * @property {String} details.description - Description of form
 * @property {String} details.heading - Heading of form
 * @property {URL} details.banner_path - Path of banner image
 *
 */
function Form(props) {
	const { id } = props?.match?.params;
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const [curr, setCurr] = useState(-1);
	const [submitLoading, setSubmitLoading] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
			if (!res.consent_toggle && curr == -1) {
				setCurr(0);
			}
		});
	}, [dispatch]);

	const history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		setSubmitLoading(true);
		const data = props.response;
		dispatch(responseCreate({ id, data })).then(res => {
			dispatch(clearLocalResponse()).then(res => {
				setSubmitLoading(false);
				history.push(`/${id}/thank`);
			});
		});
	};

	if (details && !details?.is_active) {
		return <Redirect to={`/${id}/restrict`} />;
	}
	return (
		<Container className="mb-5" fluid>
			{details && (
				<Row className="d-flex justify-content-center">
					<Col lg={8}>
						<Banner {...details} key={3} />
						{details?.consent_toggle && curr == -1 && (
							<ConsentPage
								setCurr={setCurr}
								consent_text={details.consent_text}
							/>
						)}
						{structure?.length > 0 && curr > -1 && (
							<>
								<Row>
									<Col>
										<Progress
											value={curr + 1}
											max={structure.length}
											color="danger">
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
						{curr > -1 && curr < structure?.length - 1 && (
							<Button
								className="float-right rounded-pill"
								onClick={() => setCurr(curr + 1)}>
								Next
								<Icon name="arrow right" />
							</Button>
						)}
						{curr === structure?.length - 1 && (
							<>
								<Button
									className="float-right"
									onClick={handleSubmit}
									disabled={submitLoading}>
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
					</Col>
				</Row>
			)}
		</Container>
	);
}

const mapStateToProps = state => ({
	response: state.response,
});
export default connect(mapStateToProps)(Form);
