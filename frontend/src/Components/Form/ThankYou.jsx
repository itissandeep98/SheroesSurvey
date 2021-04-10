import { Col, Container, Row } from 'reactstrap';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { useHistory } from 'react-router';

function ThankYou() {
	const history = useHistory();

	return (
		<Container className="bg-white p-4 mt-4 rounded_lg text-center">
			<Row>
				<Col>
					<h1>Thanks for filling this Survey</h1>
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

export default ThankYou;
