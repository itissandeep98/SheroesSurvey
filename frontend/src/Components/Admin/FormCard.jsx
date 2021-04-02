import {
	Col,
	Container,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from 'reactstrap';
import { Button, Icon, Image, List } from 'semantic-ui-react';
import { useState } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

function FormCard(props) {
	const {
		id,
		heading,
		description,
		section_sequence,
		created_by,
		updated_on,
		banner_path,
	} = props;
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);
	return (
		<Container className="shadow bg-white zoom_on_hover overflow-hidden rounded_lg border-danger border mt-3 h-100 d-flex justify-content-between flex-column">
			<Row
				style={{
					maxHeight: '10rem',
				}}
				className="overflow-hidden">
				<Image src={banner_path} fluid />
			</Row>
			<Row
				className="mt-2 text-center h-100"
				onClick={() => props.history.push(`/admin/${id}`)}
				style={{ cursor: 'pointer' }}>
				<Col>
					<Row>
						<Col>
							<h3 className="text-capitalize ">{heading}</h3>
							<small className="text-muted float-right">
								- Created By Sarthak
							</small>
						</Col>
					</Row>
					<Row className="mt-1">
						<Col className="text-justify">
							{description?.substring(0, 100)}
							<List bulleted>
								<List.Item>{section_sequence?.length} Sections</List.Item>
							</List>
						</Col>
					</Row>
					<small>
						<em>Updated {moment(updated_on).fromNow()}</em>
					</small>
				</Col>
			</Row>
			<Row>
				<Col>
					<hr />
					<div className="d-flex justify-content-around mb-3 w-100">
						<a
							className="zoom_on_hover text-dark"
							style={{ cursor: 'pointer' }}
							href={`/${id}`}
							target="_blank"
							rel="noopener noreferrer">
							<Icon name="eye" size="large" />
						</a>

						<NavLink to={`/admin/${id}/responses`} className="text-dark">
							<Icon name="users" size="large" />
						</NavLink>

						<Icon
							name="trash"
							style={{ cursor: 'pointer' }}
							size="large"
							onClick={toggle}
						/>
					</div>
				</Col>
			</Row>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Delete Form</ModalHeader>
				<ModalBody>
					Are you sure you want to delete form titled <em>"{heading}"</em>?
				</ModalBody>
				<ModalFooter>
					<Button primary onClick={props.delete}>
						Yes
					</Button>
					<Button secondary onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Container>
	);
}

export default withRouter(FormCard);
