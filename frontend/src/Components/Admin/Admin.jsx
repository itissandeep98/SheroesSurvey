import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import {
	allformFetch,
	formCreate,
	formDelete,
} from '../../Store/ActionCreators/form';
import { useEffect, useState } from 'react';
import FormCard from './FormCard';

function Admin(props) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [cards, setCards] = useState([]);
	useEffect(() => {
		dispatch(allformFetch()).then(res => {
			const temp = res?.sort((a, b) => (a.updated_on < b.updated_on ? 1 : -1));
			setCards(temp);
			setLoading(false)
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
	const handleDelete = (id, index) => {
		setCards([...cards.slice(0, index), ...cards.slice(index + 1)]);
		dispatch(formDelete(id));
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
			{loading ? (
				<Row className=" mt-5 justify-content-center">
					<h2 className="text-muted">
						<Spinner /> Fetching Latest Forms
					</h2>
				</Row>
			) : (
				<Row className=" mt-5 justify-content-center">
					{cards?.map((card, index) => (
						<Col sm={6} md={4} lg={3} key={Math.random()} className="h-100 ">
							<FormCard {...card} delete={() => handleDelete(card.id, index)} />
						</Col>
					))}
				</Row>
			)}
		</Container>
	);
}

export default withRouter(Admin);
