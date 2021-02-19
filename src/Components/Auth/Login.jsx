import { Col, Container, Row } from 'reactstrap';
import { Button, Form, Image, Input } from 'semantic-ui-react';

export default function Login(props) {
	return (
		<Container className="shadow p-4 mt-5 h-100">
			<Row>
				<Col xs={12}>
					<h1>Login To Continue</h1>
				</Col>
			</Row>
			<Row className="h-100 align-items-center">
				{/* <Col>
					<Image
						src={process.env.PUBLIC_URL + '/Icons/full-logo_red.svg'}
						alt="sheroes"
						fluid
					/>
				</Col> */}

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
							<Button>Submit</Button>
						</Form.Field>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
