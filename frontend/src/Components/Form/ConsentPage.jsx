/**
 * @module User/Consent
 */
import { Col, Container, Row } from 'reactstrap';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
/**
 * Consent Page for users.
 * @param {String} consent_text - Consent form details
 * @param {Function} setCurr - sets the view for users
 */
function ConsentPage(props) {
	const { setCurr, consent_text } = props;
	const history = useHistory();
	return (
		<Container>
			<Row className="bg-white p-3 rounded_lg">
				<Col>
					<h1>Consent </h1>
					<p className="text-justify">{consent_text}</p>
				</Col>
			</Row>
			<Row>
				<Col className="d-flex justify-content-end mt-3">
					<Button
						variant="outlined"
						className="mr-2"
						color="secondary"
						onClick={() => history.push('/')}>
						Disagree
					</Button>
					<Button variant="outlined" onClick={() => setCurr(0)}>
						I Agree
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default ConsentPage;
