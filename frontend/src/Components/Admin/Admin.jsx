/**
 * @module AdminView
 */
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import {
	allformFetch,
	formCreate,
	formDelete,
} from '../../Store/ActionCreators/form';
import { useEffect, useState } from 'react';
import FormCard from './FormCard';
import ProfileSummary from '../Profile/ProfileSummary';

/**
 * Represents the Admin Panel where the form creator can Manage forms and thier profiles.
 * @param {Object} user - Details of currently logged-in user from redux store.
 * @param {Integer} user.id - Unique ID of user.
 * @param {List} user.forms - List of Forms created by the User.
 *
 * @property {Function} handleCreate - Creates a New form for the current logged in User
 * @property {Function} handleDelete - Delete an Existing form for the current logged in User
 * @property {Object} Redux - Global Redux State
 * @property {Function} Redux.useState - To manage state of this component
 * @property {Function} Redux.useDispatch - Used in calling Redux function to call in order to change redux state
 * @property {Function} Redux.useSelector - To fetch the Redux state
 * @property {Function} Redux.useFFect - Function Called on component mount, unmount and state change
 */

function Admin(props) {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [cards, setCards] = useState(user?.forms);
	const history = useHistory();
	useEffect(() => {
		dispatch(allformFetch()).then(res => {
			const temp = res?.sort((a, b) => (a.updated_on < b.updated_on ? 1 : -1));
			setCards(temp);
			setLoading(false);
		});
	}, [dispatch]);

	const handleCreate = () => {
		const data = {
			created_by: user.id,
			updated_by: user.id,
			section_sequence: [],
		};
		dispatch(formCreate(data)).then(res => {
			history.push(`/admin/${res.id}`);
		});
	};
	const handleDelete = (id, index) => {
		setCards([...cards.slice(0, index), ...cards.slice(index + 1)]);
		dispatch(formDelete(id));
	};
	return (
		<Container className="mt-3" fluid>
			<ProfileSummary />
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
			{loading && (
				<Row className=" mt-5 justify-content-center">
					<h2 className="text-muted">
						<Spinner /> Fetching Latest Forms
					</h2>
				</Row>
			)}
			<Row className=" mt-5">
				{cards?.map((card, index) => (
					<Col sm={6} md={4} lg={3} key={Math.random()} className="h-100">
						<FormCard {...card} delete={() => handleDelete(card.id, index)} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Admin;
