/**
 * @module Login
 */
import { Col, Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../Store/ActionCreators/auth';
import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Icon, Image } from 'semantic-ui-react';

/**
 * Provide Login Capabilities 
 * @property {String} Username - Username of the user.
 * @property {String} Password - Password of the user.
 * 
 */

function Login(props) {
	const dispatch = useDispatch();
	const [data, setData] = useState({});
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(loginAction(data)).then(() => {
			window.location.reload();
		});
	};
	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	return (
		<Container className="shadow p-4 mt-5 h-100 bg-white">
			<Row>
				<Col>
					<h1>Login</h1>
				</Col>
				{/* <Col className="d-flex justify-content-end">
					<Icon name="instagram" size="large" />
					<Icon name="twitter" size="large" />
					<Icon name="linkedin" size="large" />
				</Col> */}
			</Row>
			<Row className="h-100 align-items-center">
				<Col md={4}>
					<Image
						src={process.env.PUBLIC_URL + '/assets/Icons/full-logo_red.svg'}
						alt="sheroes"
						fluid
					/>
				</Col>
				<Col>
					<form>
						<br />
						<TextField
							required
							variant="outlined"
							name="username"
							onChange={handleChange}
							fullWidth
							label="Username"
						/>
						<TextField
							required
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
							className="mt-2  rounded-pill float-right"
							color="secondary"
							onClick={handleSubmit}>
							Login
						</Button>
					</form>
				</Col>
			</Row>
			<Row>
				<Col className="text-center">
					<NavLink to="/register">Not Registered? Register Here</NavLink>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
