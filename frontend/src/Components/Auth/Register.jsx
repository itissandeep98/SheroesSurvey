import { Col, Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../Store/ActionCreators/auth';
import { useState } from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import { Image } from 'semantic-ui-react';

function Register(props) {
	const dispatch = useDispatch();
	const [data, setData] = useState({});
	const [disabled, setDisabled] = useState(false);
	const handleSubmit = () => {
		setDisabled(true);
		dispatch(registerAction(data)).then(() => {
			setDisabled(false);
			window.location.reload();
		});
	};
	const handleChange = e => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	return (
		<Container className="shadow p-4 mt-5 h-100 bg-white">
			<Row>
				<Col xs={12}>
					<h1>Register to Survey Platform</h1>
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
						name="first_name"
						onChange={handleChange}
						label="First Name"
						className="mt-2"
					/>
					<TextField
						variant="outlined"
						fullWidth
						name="last_name"
						onChange={handleChange}
						label="Last Name"
						className="mt-2"
					/>
					<TextField
						variant="outlined"
						fullWidth
						name="email"
						onChange={handleChange}
						label="Email"
						type="email"
						className="mt-2"
					/>
					<FormControl variant="outlined" fullWidth className="mt-2">
						<InputLabel>Gender</InputLabel>
						<Select label="Gender" onChange={handleChange} name="gender">
							<MenuItem value={'M'}>Male</MenuItem>
							<MenuItem value={'F'}>Female</MenuItem>
							<MenuItem value={'O'}>Other</MenuItem>
						</Select>
					</FormControl>
					<TextField
						variant="outlined"
						fullWidth
						name="sheroesid"
						onChange={handleChange}
						label="Sheroes ID"
						type="number"
						className="mt-2"
					/>
					<TextField
						variant="outlined"
						fullWidth
						name="partnerid"
						onChange={handleChange}
						label="Partner ID"
						type="number"
						className="mt-2"
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
					<TextField
						variant="outlined"
						fullWidth
						name="cnfpassword"
						onChange={handleChange}
						label="Confirm Password"
						type="password"
						className="mt-2"
					/>

					<Button
						variant="outlined"
						className="mt-2 float-right"
						color="secondary"
						disabled={disabled}
						onClick={handleSubmit}>
						Submit
					</Button>
				</Col>
			</Row>
			<Row>
				<Col className="text-center">
					<NavLink to="/login">Already Registered? Login Here</NavLink>
				</Col>
			</Row>
		</Container>
	);
}

export default Register;
