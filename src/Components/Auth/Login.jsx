import { Col, Container, Row } from 'reactstrap';
import { Button, Form, Input } from 'semantic-ui-react';

export default function Login(props) {
	return (
		<Container>
			<Row className="shadow p-4 mt-5">
				<Col>
					<h1>Login To Continue</h1>
					<Form>
						<Form.Field inline>
							<label>Username</label>
							<Input placeholder="Username" />
						</Form.Field>
						<Form.Field inline>
							<label>Password</label>
							<Input placeholder="Password" type="password" />
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
