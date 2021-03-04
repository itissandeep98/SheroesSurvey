import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Card, Icon } from 'semantic-ui-react';
import './style.css';

function Admin() {
	return (
		<Container className="mt-3" fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<NavLink
						to={`/admin/${Math.floor(Math.random() * 90000) + 10000}`}
						className="border p-3 bg-white text-dark">
						<Icon name="plus circle" size="big" />
						Create New Form
					</NavLink>
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

export default Admin;
