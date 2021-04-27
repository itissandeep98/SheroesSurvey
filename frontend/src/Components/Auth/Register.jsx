/**
 * @module Register
 */ 
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

/**
 * Provide Registering Capabilities 
 * @property {String} Username - Username of the user.
 * @property {String} Email - Email of the user.
 * @property {String} Password - Password of the user.
 * @property {String} FirstName - FirstName of the user.
 * @property {String} LastName - LastName of the user.
 * @property {String} LastName - LastName of the user.
 * @property {String} Gender - Gender of the user.
 * @property {Integer} SheroesID - SheroesID of the user.
 * @property {Integer} PartnerID - PartnerID of the user.
 * 
 */
function Register(props) {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		user_type: 'AD',
		sheroes_id: Math.random(),
		gender:'F'
	});
	const [cnfpassword, setcnfpassword] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const handleSubmit = e => {
		e.preventDefault();
		setDisabled(true);
		dispatch(registerAction(data)).then(() => {
			setDisabled(false);
			// window.location.reload();
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
					<h1>Register </h1>
				</Col>
			</Row>
			<Row className="h-100 align-items-center">
				<Col md={5}>
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
						<div className="mt-2 d-flex justify-content-between">
							<TextField
								required
								fullWidth
								variant="outlined"
								name="first_name"
								onChange={handleChange}
								label="First Name"
								className=" mr-2"
							/>
							<TextField
								required
								fullWidth
								variant="outlined"
								name="last_name"
								onChange={handleChange}
								label="Last Name"
								className=""
							/>
						</div>
						<div className="mt-2 d-flex justify-content-between">
							<TextField
								required
								variant="outlined"
								fullWidth
								name="email"
								onChange={handleChange}
								label="Email"
								type="email"
								className="mr-2"
							/>
							<FormControl variant="outlined" fullWidth>
								<InputLabel>Gender</InputLabel>
								<Select label="Gender" value={data.gender} onChange={handleChange} name="gender">
									<MenuItem value={'M'}>Male</MenuItem>
									<MenuItem value={'F'}>Female</MenuItem>
									<MenuItem value={'O'}>Other</MenuItem>
								</Select>
							</FormControl>
						</div>
						{/* <div className="mt-2 d-flex justify-content-between">
							<TextField
								required
								variant="outlined"
								fullWidth
								name="sheroesid"
								onChange={handleChange}
								label="Sheroes ID"
								type="number"
								className="mr-2"
							/>
							<TextField
								required
								variant="outlined"
								fullWidth
								name="partnerid"
								onChange={handleChange}
								label="Partner ID"
								type="number"
							/>
						</div> */}
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
						<TextField
							required
							variant="outlined"
							fullWidth
							name="cnfpassword"
							onChange={e => setcnfpassword(e.target.value)}
							label="Confirm Password"
							type="password"
							className="mt-2"
						/>

						<Button
							variant="outlined"
							className="mt-2 rounded-pill float-right"
							color="secondary"
							disabled={disabled || data.password !== cnfpassword}
							onClick={handleSubmit}>
							Register
						</Button>
					</form>
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
