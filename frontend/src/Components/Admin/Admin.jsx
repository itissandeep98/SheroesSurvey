import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Card, Icon } from 'semantic-ui-react';
import './style.css';
import { formCreate } from '../../Store/ActionCreators/form';

function Admin(props) {
	const dispatch = useDispatch();
	const form = useSelector(state => state.form);
	const handleCreate = () => {
		const data = {
			created_by: '2',
			updated_by: '2',
			section_sequence: [],
		};
		dispatch(formCreate(data)).then(res => {
			console.log(form);

			props.history.push(`/admin/${form.data.id}`);
		});
	};
	return (
		<Container className="mt-3" fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<div onClick={handleCreate} className="border p-3 bg-white text-dark">
						<Icon name="plus circle" size="big" />
						Create New Form
					</div>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center  mt-5">
				<Col lg={10} className="d-flex flex-row justify-content-around">
					<NavLink to={`/${Math.floor(Math.random() * 90000) + 10000}`}>
						<Card>
							<Card.Content header="Sample Form" />
							<Card.Content className="text-justify text-dark">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</Card.Content>
							<Card.Content extra>
								<Icon name="user" />
								40 Responses
							</Card.Content>
						</Card>
					</NavLink>
					<NavLink to={`/${Math.floor(Math.random() * 90000) + 10000}`}>
						<Card>
							<Card.Content header="Sample Form" />
							<Card.Content className="text-justify text-dark">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</Card.Content>
							<Card.Content extra>
								<Icon name="user" />
								40 Responses
							</Card.Content>
						</Card>
					</NavLink>
					<NavLink to={`/${Math.floor(Math.random() * 90000) + 10000}`}>
						<Card>
							<Card.Content header="Sample Form" />
							<Card.Content className="text-justify text-dark">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</Card.Content>
							<Card.Content extra>
								<Icon name="user" />
								40 Responses
							</Card.Content>
						</Card>
					</NavLink>
				</Col>
			</Row>
		</Container>
	);
}

export default withRouter(Admin);
