import { Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../Store/ActionCreators/auth';
import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Image } from 'semantic-ui-react';

function Login(props) {
	const dispatch = useDispatch();
	const [data, setData] = useState({});
	const handleSubmit = () => {
		dispatch(loginAction(data)).then(() => props.history.push('/admin'));
	};
	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	return (
		<Container className="shadow p-4 mt-5 h-100 bg-white">
			<Row>
				<Col xs={12}>
					<h1>Login to Continue</h1>
				</Col>
			</Row>
			<Row className="h-100 align-items-center">
				<Col xs={4}>
					<Image
						src={process.env.PUBLIC_URL + '/assets/Icons/full-logo_red.svg'}
						alt="sheroes"
						fluid
					/>
				</Col>
				<Col>
					<br />
					<TextField
						variant="outlined"
						name="username"
						onChange={handleChange}
						fullWidth
						label="Username"
					/>
					<TextField
						variant="outlined"
						fullWidth
						name="password"
						onChange={handleChange}
						label="Password"
						type="password"
						className="mt-2"
					/>

					<Button
						variant="outlined"
						className="mt-2 float-right"
						color="secondary"
						onClick={handleSubmit}>
						Submit
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default withRouter(Login);
