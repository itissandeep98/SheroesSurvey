import { useState } from 'react';
import './style.css';
import Drawer from '@material-ui/core/Drawer';
import {
	ListItem,
	ListItemIcon,
	List,
	IconButton,
	Divider,
} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Button, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { formDelete } from '../../Store/ActionCreators/form';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { frontUrl } from '../../Store/Url';

function NavigationBar(props) {
	const { form_id } = props;
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(formDelete(form_id)).then(() => {
			history.push(`/admin`);
		});
	};
	const list = [
		{
			text: 'Edit Form',
			icon: <EditIcon />,
			onClick: () => history.push(`/admin/${form_id}`),
		},
		{
			text: 'Preview Form',
			icon: <VisibilityIcon />,
			onClick: () => window.open(`/${form_id}`, '_blank').focus(),
		},
		{
			text: 'Copy Preview Link',
			icon: <FileCopyIcon />,
			onClick: () => navigator.clipboard.writeText(`${frontUrl}/${form_id}`),
		},
		{
			text: 'View Responses',
			icon: <GroupIcon />,
			onClick: () =>
				window.open(`/admin/${form_id}/responses`, '_blank').focus(),
		},
		{
			text: 'Delete Form',
			icon: <DeleteOutlineIcon />,
			onClick: () => setModal(!modal),
		},
		{
			text: 'Stop Accepting Responses',
			icon: <HighlightOffIcon />,
			onClick: () => console.log('here'),
		},
	];

	const data = () => (
		<div
			onClick={() => setOpen(!open)}
			onKeyDown={() => setOpen(!open)}
			className="pt-3 px-2 pr-4">
			<div
				className="text-center mt-3 d-flex justify-content-center btn"
				onClick={() => history.push('/admin')}>
				<Image
					src={process.env.PUBLIC_URL + '/Icons/full-logo_red.svg'}
					alt="sheroes"
					size="small"
				/>
			</div>
			<br />
			<Divider />
			<List>
				{list.map((item, index) => (
					<ListItem button key={index} onClick={item.onClick}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</div>
	);
	return (
		<>
			<IconButton onClick={() => setOpen(!open)} className="float-left">
				<MenuIcon fontSize="large" />
			</IconButton>
			<Drawer anchor={'left'} open={open} onClose={() => setOpen(!open)}>
				{data()}
			</Drawer>
			<DeleteModal
				modal={modal}
				toggle={() => setModal(!modal)}
				delete={handleDelete}
			/>
		</>
	);
}

function DeleteModal(props) {
	const { modal, toggle } = props;
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Delete Form</ModalHeader>
			<ModalBody>Are you sure you want to delete this form ?</ModalBody>
			<ModalFooter>
				<Button primary onClick={props.delete}>
					Yes
				</Button>
				<Button secondary onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default NavigationBar;
