import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Card, Header, Icon, IconGroup, List } from 'semantic-ui-react';
import './style.css';
import { allformFetch, formCreate } from '../../Store/ActionCreators/form';
import { useEffect, useState } from 'react';
import moment from 'moment';

function Admin(props) {
	const dispatch = useDispatch();
	const [cards, setCards] = useState([]);
	useEffect(() => {
		dispatch(allformFetch()).then(res => {
			const temp = res.sort((a, b) => (a.updated_on < b.updated_on ? 1 : -1));
			setCards(temp);
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
					<div
						onClick={handleCreate}
						className="border p-3 bg-white text-dark"
						style={{ cursor: 'pointer' }}>
						<Icon name="plus circle" size="big" />
						Create New Form
					</div>
				</Col>
			</Row>
			<Row className=" mt-5 justify-content-center">
				{cards?.map(card => (
					<Col
						sm={6}
						md={4}
						lg={3}
						className="my-2 h-100  justify-content-center d-flex">
						<Card
							className="zoom_on_hover"
							onClick={() => props.history.push(`/admin/${card.id}`)}>
							<Card.Content>
								<Header className="d-inline">{card.heading}</Header>
								<a
									className="zoom_on_hover float-right d-inline text-dark"
									style={{ cursor: 'pointer' }}
									href={`/${card.id}`}
									target="_blank"
									rel="noopener noreferrer">
									<Icon name="eye" size="large" />
								</a>
							</Card.Content>
							<Card.Content className="text-justify text-dark">
								{card.description}
								<List bulleted>
									<List.Item>
										{card.section_sequence?.length} Sections
									</List.Item>
									<List.Item>Created by {card.created_by}</List.Item>
								</List>
							</Card.Content>
							<Card.Content extra>
								<small>Updated {moment(card.updated_on).fromNow()}</small>
							</Card.Content>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default withRouter(Admin);
