import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Card, Icon } from 'semantic-ui-react';
import './style.css';
import { allformFetch, formCreate } from '../../Store/ActionCreators/form';
import { useEffect, useState } from 'react';
import moment from 'moment';

function Admin(props) {
	const dispatch = useDispatch();
	const [cards, setCards] = useState([]);
	useEffect(() => {
		dispatch(allformFetch()).then(res => {
			setCards(res);
		});
	}, [dispatch]);

	const handleCreate = () => {
		const data = {
			created_by: '2',
			updated_by: '2',
			section_sequence: [],
		};
		dispatch(formCreate(data)).then(res => {
			props.history.push(`/admin/${res.id}`);
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
			<Row className=" mt-5">
				{cards?.map(card => (
					<Col xs={3} className="my-2 h-100">
						<NavLink to={`/admin/${card.id}`}>
							<Card>
								<Card.Content header={`${card.heading}`} />
								<Card.Content className="text-justify text-dark">
									{card.description}
								</Card.Content>
								<Card.Content extra>
									<small>Created {moment(card.created_on).fromNow()}</small>
								</Card.Content>
							</Card>
						</NavLink>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default withRouter(Admin);
