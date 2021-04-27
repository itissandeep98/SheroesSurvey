/**
 * @module User/FormRestrict
 */
import { Col, Container, Row } from 'reactstrap';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useHistory } from 'react-router';

/**
 * Page user views when a form is unavailable or is restricted by admin
 * 
 */
function FormRestrict() {
	const history = useHistory();

	return (
		<Container className="bg-white p-4 mt-4 rounded_lg text-center">
			<Row>
				<Col>
					<h1>
						<ErrorOutlineIcon fontSize="large" color="secondary" />
						Form Unavailable
					</h1>
					<h3 className="text-muted">
						Form has either stopped Accepting Responses or is Disabled by Owner
					</h3>
					<Button
						variant="outlined"
						startIcon={<HomeIcon />}
						className="mr-3"
						onClick={() => history.push('/')}>
						Back to Home
					</Button>
					{/* <Button
						variant="outlined"
						startIcon={<CancelPresentationIcon />}
						onClick={() => window.top.close()}>
						Close window
					</Button> */}
				</Col>
			</Row>
		</Container>
	);
}

export default FormRestrict;
