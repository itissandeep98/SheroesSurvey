import { Col, Container, Row } from 'reactstrap';
import { Button, Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

function Login(props) {
	const handleSubmit = () => {
		props.history.push('/admin');
	};
	return (
		<Container className="shadow p-4 mt-5 h-100 bg-white">
			<Row>
				<Col xs={12}>
					<h1>Login To Continue</h1>
				</Col>
			</Row>
			<Row className="h-100 align-items-center">
				<Col>
					<br />
					<Form>
						<Form.Field inline required>
							<label>Username</label>
							<Input placeholder="Username" fluid />
						</Form.Field>
						<Form.Field inline required>
							<label>Password</label>
							<Input placeholder="Password" type="password" fluid />
						</Form.Field>
						<Form.Field inline>
							<Button onClick={handleSubmit}>Submit</Button>
						</Form.Field>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default withRouter(Login);
